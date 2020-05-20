import React from "react";
import styless from './users.module.css'


let Users = (props) => {

  if(props.users.length === 0) {
    props.setUsers([{
      id: 1,
      photoUrl: 'https://im0-tub-ru.yandex.net/i?id=337f64b3058accd22fa35ba31a86fcdc&n=13',
      fullName: 'Andrew',
      status: 'I am a boss',
      followed: true,
      location: {country: 'Russia', city: 'Moscow'}
    },
      {
        id: 2,
        photoUrl: 'https://im0-tub-ru.yandex.net/i?id=337f64b3058accd22fa35ba31a86fcdc&n=13',
        fullName: 'Alina',
        status: 'I am a boss too',
        followed: false,
        location: {country: 'France', city: 'Paris'}
      }
    ])
  }

  return <div>
    {
      props.users.map(u => <div key={u.id}>
        <span>
          <div>
            <img className={styless.photo} src={u.photoUrl}/>
          </div>
          <div>{u.followed ? <button onClick={() => {
            props.unfollow(u.id)
          }}>Unfollow</button> : <button onClick={() => {
            props.follow(u.id)
          }}>Follow</button>}</div>
          <div>
            {u.fullName}
          </div>
        </span>
        <span>
          <div>
            {u.status}
          </div>
          <div>
            {u.location.country}
          </div>
          <div>
            {u.location.city}
          </div>
        </span>
      </div>)
    }
  </div>

}

export default Users;