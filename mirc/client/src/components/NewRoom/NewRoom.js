import React from 'react'

const Input = ({ newRoom, setNewRoom, createRoom }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={newRoom}
      onChange={({ target: { value } }) => setNewRoom(value)}
      onKeyPress={event => event.key === 'Enter' ? createRoom(event) : null}
    />
    <button className="sendButton btn btn-default" onClick={e => createRoom(e)}>Create</button>
  </form>
)

export default Input;