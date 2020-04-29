import React from 'react'
import mjml2html from 'mjml'

const verification = mjml2html(`
  <mjml>
    <mj-head>
      <mj-title>Email verification successful!</mj-title>
      <mj-include path="./style.mjml" />
      <mj-attributes>
        <mj-class name="divider-top" width="50px" padding="20px 0" border-color="#F15A22" />
        <mj-class name="divider-bottom" width="100%" padding="0 0 24px" border-color="#DADADA" border-width="1px" />
        <mj-class name="text" font-size="16px" line-height="24px" color="#000" padding="0" />
        <mj-class name="text-padding" padding="20px 0 30px 0" />
        <mj-class name="wrapper" padding="0" />
        <mj-class name="column" padding="0 20px 0 0" />
        <mj-class name="text-footer" font-size="12px" color="#5D5D5D" padding="0" font-weight="300" />
        <mj-class name="headline" font-size="40px" line-height="48px" color="#000" font-family="Jubilat" font-weight="900" padding="0" />
        <mj-class name="headline-footer" font-size="14px" line-height="24px" color="#000" padding="0" />
      </mj-attributes>
    </mj-head>
    <mj-body background-color="#FFF">
      <mj-wrapper mj-class="wrapper">
        <mj-section css-class="section">
          <mj-column>
            <mj-text mj-class="headline">Verification has been successful!</mj-text>
            <mj-divider mj-class="divider-top" css-class="divider" />
            <mj-text mj-class="text">Hello Darja,</mj-text>
            <mj-text mj-class="text text-padding">Your Email address was successfully verified.</mj-text>
            <mj-text mj-class="text">Now, we would like to get to know you a little better. Please schedule a time for a meeting with me at ReDI School.
              Just check out our <a href='' class="text-link">calendar</a> and make a suitable appointment.</mj-text>
            <mj-text mj-class="text" padding="20px 0 30px 0">I am excited to get to know you soon!</mj-text>
            <mj-text mj-class="text">Best,</mj-text>
            <mj-text mj-class="text">Isabelle</mj-text>
          </mj-column>
        </mj-section>
        <mj-section css-class="section">
          <mj-column width="100%">
            <mj-divider mj-class="divider-bottom" />
          </mj-column>
          <mj-column mj-class="column" width="100%">
            <mj-table padding="0">
              <tr>
                <td class="table-cell table-img" rowspan="4">
                  <img src="../../../assets/images/isabelle_profile.svg" width="52px" />
                </td>
                <td class="table-cell table-headline td-mobile" colspan="2">
                  Isabelle Köhncke
                </td>
              </tr>
              <tr>
                <td class="table-cell td-mobile">
                  Manager Mentorship Program
                </td>
                <td class="table-cell td-mobile hide-cell-mobile">
                  ReDI School of Digital Integration
                </td>
              </tr>
              <tr>
                <td class="table-cell td-mobile">
                  Career Department ReDI School
                </td>
                <td class="table-cell td-mobile hide-cell-mobile">
                  Am Nordbahnhof 3, 10115 Berlin
                </td>
              </tr>
              <tr>
                <td class="table-cell td-mobile margin-link">
                  <a href="mailto:isabelle@redi-school.org" class="text-link">isabelle@redi-school.org</a>
                </td>
                <td class="table-cell td-mobile hide-cell-desktop">
                  ReDI School of Digital Integration
                </td>
                <td class="table-cell td-mobile hide-cell-desktop">
                  Am Nordbahnhof 3, 10115 Berlin
                </td>
                <td class="table-cell td-mobile">
                  <a href="https://www.redi-school.org" class="text-link" target="_blank">www.redi-school.org</a>
                </td>
              </tr>
              <mj-table>
          </mj-column>
        </mj-section>
      </mj-wrapper>
    </mj-body>
  </mjml>
`)
const Templates = () => (
  <>
    {verification}
  </>
)

export default Templates
