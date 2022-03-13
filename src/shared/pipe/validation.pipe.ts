import * as Joi from '@hapi/joi';
import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  NotImplementedException,
  Optional,
  PipeTransform,
} from '@nestjs/common';
import * as Joiful from 'joiful';
import { Constructor, getJoiSchema } from 'joiful/core';
import { ValidationError as ValidationErrorFormat } from '../provider/error-provider';

type Mergeable = Constructor<any> | Joi.AnySchema;

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(
    @Optional() private schemas?: Mergeable[],
    @Optional() private wrapSchemaAsArray?: boolean,
  ) {}
  mergeSchemas(): Joi.AnySchema {
    return this.schemas.reduce((merged: Joi.AnySchema, current) => {
      const schema =
        current.hasOwnProperty('isJoi') && current['isJoi']
          ? (current as Joi.AnySchema)
          : getJoiSchema(current as Constructor<any>, Joi);
      return merged ? merged.concat(schema) : schema;
    }, undefined) as Joi.Schema;
  }
  validateAsSchema(value: any) {
    const { error } =
      Array.isArray(value) && this.wrapSchemaAsArray
        ? Joi.array()
            .items(this.mergeSchemas())
            .validate(value, { abortEarly: false })
        : this.mergeSchemas().validate(value, { abortEarly: false });

    if (error) {
      const messages = error?.details.map((errorDetail) => {
        return errorDetail.message.replace(/['"]+/g, '');
      });
      throw new HttpException(new ValidationErrorFormat(messages), 422);
    }
  }
  validateAsClass(value: any, metadata: ArgumentMetadata): void | never {
    const { error } = Array.isArray(value)
      ? Joiful.validateArrayAsClass(
          value,
          metadata.metatype as Constructor<any>,
          { abortEarly: false },
        )
      : Joiful.validateAsClass(value, metadata.metatype as Constructor<any>, {
          abortEarly: false,
        });

    if (error) {
      const messages = error?.details.map((errorDetail) => {
        return errorDetail.message.replace(/['"]+/g, '');
      });
      throw new HttpException(new ValidationErrorFormat(messages), 422);
    }
  }
  transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata?.metatype && !this.schemas)
      throw new NotImplementedException('Missing validation schema');
    if (this.schemas) this.validateAsSchema(value);
    else this.validateAsClass(value, metadata);
    return value;
  }
}
