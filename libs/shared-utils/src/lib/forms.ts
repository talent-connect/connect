import { useFormik, FormikConfig, FormikHelpers } from 'formik';
import * as Yup from 'yup';

type ValidationObjectType<T extends Yup.ObjectSchema<object>> =
  T extends Yup.ObjectSchema<infer G> ? G : never;

type YupConstructor<T extends object> =
  (yup: typeof Yup) => Yup.ObjectSchemaDefinition<T>;

type FormikOnSubmit<T extends object, C extends object> =
  (data: T, helpers: FormikHelpers<T>, context: C) => void;

interface FormikModifiedConfig<T extends object> {
  /** Should Formik reset the form when new initialValues change */
  enableReinitialize?: FormikConfig<T>['enableReinitialize'];
  /** Tells Formik to validate upon mount */
  validateOnMount?: FormikConfig<T>['validateOnMount'];
}

function onSubmitFactory<T extends object, C extends object> (
  validationSchema: Yup.ObjectSchema<T>,
  initialValues: (context: C) => T,
  config?: FormikModifiedConfig<T>
) {
  return function (onSubmit: FormikOnSubmit<T, C>) {
    return (context: C) => useFormik<T>({
      ...(config || {}),
      validationSchema,
      initialValues: initialValues(context),
      onSubmit: (values, helpers) => onSubmit(values, helpers, context)
    });
  }
}

/** ... */
export function createComponentForm<C extends object> () {
  return {
    /** ... */
    validation<T extends object> (formSchema: YupConstructor<T>) {
      const validationSchema = Yup.object(formSchema(Yup));
      type FormType = ValidationObjectType<typeof validationSchema>;
      
      return {
        /** Definition of the initial values using the context of the component  */
        initialValues: (initialValues: (context: C) => FormType) => ({
            /** ... */
            formikConfig: (config?: FormikModifiedConfig<FormType>) => ({
                /** ... */
                onSubmit: onSubmitFactory(validationSchema, initialValues, config)
            }),
            /** ... */
            onSubmit: onSubmitFactory(validationSchema, initialValues)
          })
      };
    }
  }
}

