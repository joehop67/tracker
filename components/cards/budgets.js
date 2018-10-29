/**
 * Dependencies
 */
import React from 'react'
import {Jumbotron, Progress} from 'reactstrap'
import async from '../../util/async'
import fetch from '../../util/fetch'

/**
 * Budget card component
 * 
 * Takes a budget ID and display's a Jumbotron that displays
 * the budget name, the current savings, the desired savings,
 * and a progress bar that displays the percentage of the desired
 * savings that are current saved
 * 
 * Props: -budget: String, ID of budget to be displayed in card
 *        -token: String, User Auth Token
 * 
 * @param {Object} props
 * @api public
 */

export default function BudgetCard (props) {
  return async(getBudget(props.budget, props.token), ({data}) => {
    if (data) {
      const progress = (data.saved / data.savings) * 100
      return (
        <div className='budget-card'>
          <style jsx>{`
            :global(.bg-bar) {
              background: grey;
            }
            .amounts {
              display: flex;
              justify-content: space-between;
            }
            .current {
              color: green;
              font-size: 2rem;
            }
            .desired {
              color: blue;
              font-size: 2rem;
            }
            .percent {
              color: grey;
              font-size: 1.5rem;
            }
          `}</style>
          <Jumbotron>
            <h1>{data.name}</h1>
            {props.title && <h3>Current Budget</h3>}
            <div className='saving-progress'>
              <div className='amounts'>
                <span className='current'>${data.saved}</span>
                <span className='percent'>{progress}%</span>
                <span className='desired'>${data.savings}</span>
              </div>
              <div className='saved-bar'>
                <Progress value={progress} className='bg-bar' />
              </div>
            </div>
          </Jumbotron>
        </div>
      )
    }
    else return <h1>Loading</h1>
  })
}

/**
 * Get Budget by ID
 * 
 * @param {String} id
 * @param {String} token
 * @api private
 */

function getBudget (id, token) {
  return fetch.get(`/plans/single/budgets/${id}`, token)
}