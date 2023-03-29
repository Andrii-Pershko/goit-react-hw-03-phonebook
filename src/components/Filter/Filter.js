import PropTypes from 'prop-types';

const Filter = ({ onChange }) => {
  return (
    <>
      <p>Find contacts by name</p>
      <input type="text" name="filter" onChange={onChange}></input>
    </>
  );
};

export default Filter;

Filter.propTypes = {
  onChange: PropTypes.func,
};
