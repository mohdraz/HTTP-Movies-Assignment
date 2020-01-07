import React, { useState, useEffect } from "react";
import axios from "axios";

const initialItem = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovies = props => {
  const [item, setItem] = useState(initialItem);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        console.log("data: ", res.data);
        setItem(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const changeHandler = event => {
    // event.persist();
    let value = event.target.value;

    setItem({
      ...item,
      [event.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${item.id}`, item)
      .then(res => {
        console.log("update items: ", res.data);
        setItem(res.data);
        props.history.goBack();
      })
      .catch(err => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <div className="save-wrapper">
      <h2>Update Movie</h2>
      <form action="" className="movie-card" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={item.title}
          onChange={changeHandler}
        />

        <input
          type="text"
          name="director"
          value={item.director}
          onChange={changeHandler}
        />

        <input
          type="text"
          name="metascore"
          value={item.metascore}
          onChange={changeHandler}
        />
        <h3>Actors</h3>
        {/* {item.stars.map((star, index) => (
          <input
            key={index}
            type="text"
            name="stars"
            value={star}
            onChange={changeHandler.bind(this, index)}
          />
        ))} */}

        <input
          type="text"
          name="stars"
          value={item.stars}
          onChange={changeHandler}
        />

        <button>Update</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};
export default UpdateMovies;

/*
import React, { useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const UpdateMovies = props => {
  const { values, status } = props;

  useEffect(() => {
    const itemToEdit = props.movies.find(
      item => `${item.id}` === props.match.params.id
    );

    if (itemToEdit) {
      return status;
    }
  }, [props.movies, props.match.params.id]);

  return (
    <Form>
      <Field type="text" name="title" value={values.name} />
    </Form>
  );
};

const FormikUpdateMovies = withFormik({
  mapPropsToValues({ props, name }) {
    return {
      name: props.movies.title
    };
  },
  handleSubmit(values, { setStatus }) {
    setStatus(values);
  }
})(UpdateMovies);

export default FormikUpdateMovies;
*/
