/**
 * Dependencies
 */
import React from 'react'
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap'

/**
 * User info card
 * 
 * Displays various user info including name, email,
 * salary, partner, etc.
 * 
 * Props: -data: Object, User/Partner data
 *        -current: Boolean, Is current User?
 *        -sendRequest: function, send partner request to user
 *        -acceptRequest: function, accept partner request from user
 * 
 * @param {Object} props
 * @api private
 */

export default function UserCard (props) {
  const {data, current, sendRequest, acceptRequest, accept} = props
  return (
    <div className='usercard'>
      <style jsx>{`
        ul {
          list-style-type: none;
          margin-top: .5rem;
        }
        .actions {
          margin: 1rem;
        }
      `}</style>
      <Card>
        <CardImg top width='100%' src='/static/placeholder.jpg' alt='Profile Photo' />
        <CardBody>
          <CardTitle>{data.user.name || data.user.email}</CardTitle>
          {data.user.name && <CardSubtitle>{data.user.email}</CardSubtitle>}
          <CardText>
            <ul>
              <li><b>Salary:</b> ${data.user.salary}</li>
              <li><b>Groups:</b> Placeholder</li>
              {data.partner && <li><b>Partner: </b><a href={`/profile/user?id=${data.partner._id}`}>{data.partner.name}</a></li>}
            </ul>
            <div className='actions'>
              {!current && <Button onClick={() => {
                sendRequest(data.user.email, props.token)
              }}>Send Partner Request</Button>}
              {accept && <Button onClick={() => acceptRequest()}>Accept Request</Button>}
            </div>
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}