import { useCallback } from 'react'
import Button from '@material-ui/core/Button'

import { API_URL } from '../../config'
import doApiRequest from '../../lib/react-admin-loopback/src/fetch'

/**
 * Builds a button for approving a TP Company Profile with review status
 * @param {string} buttonType
 */
export const tpCompanyProfileBuildApproveButton = () => {
  const ConfiguredButton = ({ data }) => {
    // On click, make a request to approve
    const onClick = useCallback(() => {
      const sendRequest = async () => {
        const finalConfirmationPrompt = `Are you certain you want to aporove this user?`
        const shouldContinue = await showConfirmPrompt(finalConfirmationPrompt)

        if (!shouldContinue) return

        const requestUrl = `${API_URL}/tpCompanyProfiles/pendingReviewDoAccept`
        const requestPayload = {
          body: JSON.stringify({ tpCompanyProfileId: data.id }),
          method: 'post',
        }

        try {
          await doApiRequest(requestUrl, requestPayload)

          alert(`Company approval completed`)

          window.location.reload()
        } catch (err) {
          alert(`Error occured: ${err}`)
        }
      }

      sendRequest()
    }, [data])

    return <Button onClick={onClick}>Approve</Button>
  }

  return ConfiguredButton
}

const showConfirmPrompt = (promptText) =>
  new Promise((resolve, reject) => resolve(window.confirm(promptText)))
