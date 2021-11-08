import React from 'react'
import Button from '@mui/material/Button'

import { API_URL } from '../../config'
import doApiRequest from '../../lib/react-admin-loopback/src/fetch'

/**
 * Builds a button either approving or rejecting a RedProfile with review status
 * @param {string} buttonType
 */
export const tpJobseekerProfileBuildApproveOrRejectButton = (operationType) => {
  const ConfiguredButton = ({ data }) => {
    // On click, make a request to either approve or reject
    const onClick = React.useCallback(() => {
      const sendRequest = async () => {
        const finalConfirmationPrompt = `Are you certain you want to ${operationTypeToLabelMap[operationType]} this user?`
        const shouldContinue = await showConfirmPrompt(finalConfirmationPrompt)
        if (!shouldContinue) return
        const requestUrl = operationUrl(operationType)
        const requestPayload = {
          body: JSON.stringify({
            tpJobseekerProfileId: data.id,
          }),
          method: 'post',
        }
        try {
          const responseRaw = await doApiRequest(requestUrl, requestPayload)
          const response = responseRaw.json
          alert(`User ${operationTypeToLabelMap[operationType]} completed`)
          window.location.reload()
        } catch (err) {
          alert(`Error occured: ${err}`)
        }
      }
      sendRequest()
    }, [data])

    return (
      <Button onClick={onClick}>
        {operationTypeToLabelMap[operationType]}
      </Button>
    )
  }

  return ConfiguredButton
}

const showConfirmPrompt = (promptText) =>
  new Promise((resolve, reject) => resolve(window.confirm(promptText)))

const operationUrl = (operationType) =>
  operationTypeValidOrThrow(operationType) &&
  `${API_URL}/tpJobseekerProfiles/${operationTypeToRedProfileCollectionMethodMap[operationType]}`

const operationTypeToRedProfileCollectionMethodMap = {
  APPROVE: 'pendingReviewDoAccept',
  DECLINE: 'pendingReviewDoDecline',
}

const operationTypeToLabelMap = {
  APPROVE: 'Approve',
  DECLINE: 'Decline',
}

const operationTypeValidOrThrow = (operationType) => {
  if (
    !Object.keys(operationTypeToRedProfileCollectionMethodMap).includes(
      operationType
    )
  ) {
    throw new Error('Invalid operationType given')
  }
  return true
}
