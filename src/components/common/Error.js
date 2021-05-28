// * temp stand-in for bug fix


function Error() {
  return (
    <h2 className="subtitle has-text-centered is-fullwidth">
      Can't find what you're looking for? Check you are in the right place...
      <span role="img" aria-label="sad-emoji">
        {' '}
        😞
      </span>
    </h2>
  )
}

export default Error