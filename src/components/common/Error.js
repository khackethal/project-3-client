// * temp stand-in for bug fix


function Error() {
  return (
    <>
      <div className="title is-5 has-text-danger has-background-black has-text-centered is-fullwidth">
        {'Can\'t find what you\'re looking for? Check you are in the right place...'}

      </div>
      <figure className="image">
        <img src="https://imgur.com/z6KGlzV.png" />
      </figure>
    </>
  )
}

export default Error