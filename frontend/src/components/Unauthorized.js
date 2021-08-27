const Unauthorized = () => {
  return (
    <main>
      <p>You have no permission to enter this section.</p>
    </main>
  )
}

export default cononect(mapStateToProps)(Unauthorized)
