import * as Yup from 'yup';

type ValidationObjectType<T extends Yup.ObjectSchema<object | null | undefined>> =
  T extends Yup.ObjectSchema<infer G> ? G : never