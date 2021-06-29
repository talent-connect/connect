import React from 'react';

import { Heading, Button, Modal, FormInput } from '@talent-connect/shared-atomic-design-components';
import {
  Columns,
  Element,
} from 'react-bulma-components';

import { LoggedIn } from '../../../components/templates'
import { EmptySectionPlaceholder } from '../../../components/molecules/EmptySectionPlaceholder';

const CvList: React.FC = () => {
  const [showCvNameModal, setShowCvNameModal] = React.useState(false);
  const [newCvName, setNewCvName] = React.useState('');

  const handleCvNameChange = (e) => setNewCvName(e.target.value)

  return <LoggedIn>
    <Columns className="is-6 is-variable">
      <Columns.Column size="full">
        <div style={{ marginBottom: 72 }}>
          <Heading size="smaller">CV BUILDER</Heading>
          <div style={{ width: 300 }}>
            <Heading size="medium" border="bottomLeft">Welcome to the CV Builder tool!</Heading>
          </div>
          <div style={{ width: 700 }}>
            <Element>
              We build that tool to help you create, fast and easy, a perfect CV to download and apply for your desired position.
            </Element>
          </div>
        </div>
        <div style={{ width: 300, marginBottom: 120 }}>
          <Button fullWidth onClick={() => setShowCvNameModal(true)}>Create a CV</Button>
        </div>
        <div style={{ paddingBottom: 10, borderBottom: '1px solid #DADADA', marginBottom: 32 }}>
          <Heading size="small">Your CVs</Heading>
        </div>
        <EmptySectionPlaceholder
          height="tall"
          text="Create a CV"
          onClick={() => setShowCvNameModal(true)} />
      </Columns.Column>
    </Columns>
    <Modal show={showCvNameModal} stateFn={setShowCvNameModal} title="Create a CV">
      <Modal.Body>
        <FormInput
          name="cvName"
          label="Name of the CV"
          values={{ cvName: newCvName }}
          handleChange={handleCvNameChange}
        />
      </Modal.Body>
      <Modal.Foot>
        <Button disabled={!newCvName}>Save</Button>
      </Modal.Foot>
    </Modal>
  </LoggedIn>
};

export default CvList;