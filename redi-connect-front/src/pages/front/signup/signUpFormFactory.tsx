import React, { useState } from "react";
import * as Yup from "yup";

import {
  FormikValues,
  FormikHelpers as FormikActions,
  useFormik,
} from "formik";
import omit from "lodash/omit";

// import Button from "../../../components/atoms/Button";

import SignUp from "../../../components/molecules/teaser/SignUp";

import { Columns, Form, Heading, Button } from "react-bulma-components";

import { signUp } from "../../../services/api/api";
import { RedProfile } from "../../../types/RedProfile";
import { history } from "../../../services/history/history";

import { courses } from "../../../config/config";

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .required()
    .max(255),
  lastName: Yup.string()
    .required()
    .max(255),
  username: Yup.string()
    .email()
    .label("Email")
    .max(255),
  password: Yup.string()
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password")
    .label("Password"),
  passwordConfirm: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match"),
  agreesWithCodeOfConduct: Yup.boolean()
    .required()
    .oneOf([true]),
  gaveGdprConsentAt: Yup.string()
    .required()
    .label("Data usage consent"),
  mentee_currentlyEnrolledInCourse: Yup.string().when("formType", {
    is: "public-sign-up-mentee-pending-review",
    then: Yup.string()
      .oneOf(courses.map(level => level.id))
      .label("Currently enrolled in course"),
  }),
});

export type SignUpFormType =
  | "public-sign-up-mentor-pending-review"
  | "public-sign-up-mentee-pending-review";

export interface SignUpFormValues {
  formType: SignUpFormType;
  gaveGdprConsentAt: string;
  username: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  agreesWithCodeOfConduct: boolean;
  mentee_currentlyEnrolledInCourse: string;
}

const initialValues: SignUpFormValues = {
  formType: "public-sign-up-mentee-pending-review",
  gaveGdprConsentAt: "",
  username: "",
  password: "",
  passwordConfirm: "",
  firstName: "",
  lastName: "",
  agreesWithCodeOfConduct: false,
  mentee_currentlyEnrolledInCourse: "",
};

export const buildSignUpForm = (
  type: SignUpFormType
): Function => (): React.ReactFragment => {
  const [submitError, setSubmitError] = useState(false);
  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<SignUpFormValues>
  ) => {
    setSubmitError(false);
    const profile = values as Partial<RedProfile>;
    // TODO: this needs to be done in a smarter way, like iterating over the RedProfile definition or something
    const cleanProfile: Partial<RedProfile> = omit(profile, [
      "password",
      "passwordConfirm",
      "formType",
      "agreesWithCodeOfConduct",
    ]);
    cleanProfile.userType = type;
    cleanProfile.userActivated = false;
    cleanProfile.signupSource = "public-sign-up";
    try {
      await signUp(values.username, values.password, cleanProfile);
      history.push("/front/signup/complete/" + type);
    } catch (error) {
      setSubmitError(Boolean(error));
    }
    actions.setSubmitting(false);
  };

  initialValues.formType = type;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  const onChange = (name: any, e: any) => {
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };

  return (
    <Columns vCentered>
      <Columns.Column
        size={6}
        responsive={{ mobile: { hide: { value: true } } }}
      >
        <SignUp />
      </Columns.Column>

      <Columns.Column size={5} offset={1}>
        <form onSubmit={e => e.preventDefault()}>
          <Heading
            size={1}
            weight="normal"
            renderAs="h1"
            className="title--border"
          >
            Sign-up
          </Heading>
          <Form.Field>
            <Form.Control>
              <Form.Input
                id="firstName"
                name="firstName"
                color={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                    ? "danger"
                    : null
                }
                placeholder="First name*"
                value={formik.values.firstName}
                onChange={onChange.bind(null, "firstName")}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Input
                id="lastName"
                name="lastName"
                color={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                    ? "danger"
                    : null
                }
                placeholder="Last name*"
                value={formik.values.lastName}
                onChange={onChange.bind(null, "lastName")}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Input
                id="username"
                name="username"
                type="email"
                color={
                  formik.touched.username && Boolean(formik.errors.username)
                    ? "danger"
                    : null
                }
                placeholder="Username (your email address)*"
                value={formik.values.username}
                onChange={onChange.bind(null, "username")}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Input
                id="password"
                name="password"
                type="password"
                color={
                  formik.touched.password && Boolean(formik.errors.password)
                    ? "danger"
                    : null
                }
                placeholder="Password*"
                value={formik.values.password}
                onChange={onChange.bind(null, "password")}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                color={
                  formik.touched.passwordConfirm &&
                  Boolean(formik.errors.passwordConfirm)
                    ? "danger"
                    : null
                }
                placeholder="Repeat password*"
                value={formik.values.passwordConfirm}
                onChange={onChange.bind(null, "passwordConfirm")}
              />
            </Form.Control>
          </Form.Field>
          {type === "public-sign-up-mentee-pending-review" && (
            <>
              <Form.Field>
                <Form.Label size="small">
                  Which course are you taking at ReDI?*
                </Form.Label>
                <Form.Control>
                  <Form.Select
                    name="mentee_currentlyEnrolledInCourse"
                    className="is-fullwidth"
                    value={formik.values.mentee_currentlyEnrolledInCourse}
                    onChange={onChange.bind(
                      null,
                      "mentee_currentlyEnrolledInCourse"
                    )}
                    color={
                      formik.touched.mentee_currentlyEnrolledInCourse &&
                      Boolean(formik.errors.mentee_currentlyEnrolledInCourse)
                        ? "danger"
                        : null
                    }
                  >
                    <option id="" value="" disabled>
                      Your current ReDI Course
                    </option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Control>
              </Form.Field>
            </>
          )}
          <Form.Field className="submit-spacer">
            <Form.Control>
              <input
                id="agreesWithCodeOfConduct"
                className="is-checkradio is-small"
                type="checkbox"
                name="agreesWithCodeOfConduct"
                checked={formik.values.agreesWithCodeOfConduct}
                onChange={onChange.bind(null, "agreesWithCodeOfConduct")}
                disabled={formik.isSubmitting}
              />
              <label htmlFor="agreesWithCodeOfConduct">
                I agree to the{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://connect.redi-school.org/downloadeables/redi-connect-code-of-conduct.pdf"
                >
                  Code of Conduct
                </a>{" "}
                of the ReDI School
              </label>
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Control>
              <input
                id="gaveGdprConsentAt"
                type="checkbox"
                className="is-checkradio is-small is-checkradio--redi"
                name="gaveGdprConsentAt"
                value={new Date().toString()}
                checked={!!formik.values.gaveGdprConsentAt.length}
                onChange={onChange.bind(null, "gaveGdprConsentAt")}
                disabled={formik.isSubmitting}
              />
              <label htmlFor="gaveGdprConsentAt">
                I give permission to the ReDI School Terms stated in the{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.redi-school.org/data-privacy-policy"
                >
                  Data Protection
                </a>
              </label>
            </Form.Control>
            {submitError && (
              <Form.Help color="danger">
                An error occurred, please try again.
              </Form.Help>
            )}
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Button
                className="button--default button--medium"
                fullwidth={true}
                onClick={() => formik.handleSubmit()}
                disabled={formik.dirty && formik.isValid ? false : true}
              >
                Submit
              </Button>
            </Form.Control>
          </Form.Field>
        </form>
      </Columns.Column>
    </Columns>
  );
};
