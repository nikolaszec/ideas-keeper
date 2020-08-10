import React from 'react';
import PropTypes from 'prop-types';
import classes from '../styles/forms/Form.module.css';
import categoryOptions from '../data';
import { useForm } from 'react-hook-form';
import ErrorMessage from './ErrorMessage/ErrorMessage';

const requiredMessage = 'This field is required.';
const Form = ({ handleSubmit: submitFromProps, initialValues }) => {
  const { handleSubmit, register, errors } = useForm();

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitFromProps)}>
      <label htmlFor="title">Title</label>
      <input
        ref={register({ required: requiredMessage })}
        id="title"
        name="title"
        type="text"
        defaultValue={initialValues && initialValues.title}
      />
      <ErrorMessage errors={errors} name="title" />
      <label htmlFor="description">Description</label>
      <textarea
        rows={3}
        ref={register({ required: requiredMessage })}
        id="description"
        name="description"
        defaultValue={initialValues && initialValues.description}
      />
      <ErrorMessage errors={errors} name="description" />
      <label htmlFor="expectations">Expectations</label>
      <textarea
        ref={register({ required: requiredMessage })}
        id="expectations"
        name="expectations"
        defaultValue={initialValues && initialValues.expectations}
      />
      <ErrorMessage errors={errors} name="expectations" />
      <label htmlFor="category">Category</label>
      <select
        ref={register({ required: requiredMessage })}
        id="category"
        name="category"
        defaultValue={initialValues && initialValues.category}
      >
        {categoryOptions.map((opt) => (
          <option key={opt.label} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ErrorMessage errors={errors} name="category" />
      <label htmlFor="rating">Rating</label>
      <input
        ref={register({ required: requiredMessage })}
        id="rating"
        name="rating"
        type="number"
        min={1}
        max={10}
        defaultValue={initialValues && initialValues.rating}
      />
      <ErrorMessage errors={errors} name="rating" />
      <button type="submit">SAVE</button>
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    expectations: PropTypes.string,
    category: PropTypes.string,
    rating: PropTypes.string,
  }),
};

export default Form;
