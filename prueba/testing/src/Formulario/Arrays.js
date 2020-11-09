import React from 'react';
import { Formik, Form, Field } from 'formik';

export const BasicArrayExample = () => (
  <div>
    <h1>Array</h1>
    <Formik
      initialValues={{
        friends: ['jared', 'ian'],
      }}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      <Form>
        <Field name="friends[0]" />
        <Field name="friends[1]" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);