import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';

export function formatDate(date) {
  const dateObj = new Date(date);
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = (dateObj.getDate() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${month}/${day}/${year}`;
}

export function formatTime(time) {
  const [hoursInput, minutes] = time.split(':');
  let hours = parseInt(hoursInput, 10);

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

export function formatPhoneNumber(phoneNumber) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}

export default function DisplayStudentTravelRegistrationFormDay() {
  const formRef = useRef();

  const query = new URLSearchParams(useLocation().search);
  const formId = query.get('formId');
  const userEmail = query.get('email');

  const [formData, setFormData] = useState(null);
  DisplayStudentTravelRegistrationFormDay.propTypes = {
    userEmail: PropTypes.string,
    formId: PropTypes.string,
    usingUniversityTransport: PropTypes.string,
  };
  useEffect(() => {
    const url = `http://127.0.0.1:5000/get-user-submitted-forms/${formId}?email=${userEmail}`;
    console.log(url);
    axios
      .get(url)
      .then((res) => setFormData(res.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [formId, userEmail]);

  if (!formData) {
    return <div>Loading...</div>;
  }

  const calculateAge = (date_of_birth) => {
    const dob = new Date(date_of_birth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const numMonths = today.getMonth() - dob.getMonth();
    if (numMonths < 0 || (numMonths === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };
  const age = calculateAge(formData.form.date_of_birth);

  // FIXME improve resolution
  function downloadPDF() {
    html2canvas(formRef.current, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'pt', 'a4');

      // Define the padding for top and bottom (in points)
      const paddingTopBottom = 20; // Adjust this value as needed

      // Get the aspect ratio of the canvas
      const canvasAspectRatio = canvas.height / canvas.width;

      // Get the dimensions of the PDF page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight() - 2 * paddingTopBottom; // Subtract padding from total height

      // Calculate the dimensions of the image in the PDF
      let imgWidthInPdf, imgHeightInPdf;

      // Check if the image fits better to the width or height of the PDF
      if (pdfWidth / pdfHeight < canvasAspectRatio) {
        // Fit to height
        imgHeightInPdf = pdfHeight;
        imgWidthInPdf = imgHeightInPdf / canvasAspectRatio;
      } else {
        // Fit to width
        imgWidthInPdf = pdfWidth;
        imgHeightInPdf = imgWidthInPdf * canvasAspectRatio;
      }

      // Center the image horizontally and add padding vertically
      const x = (pdfWidth - imgWidthInPdf) / 2;
      const y = paddingTopBottom + (pdfHeight - imgHeightInPdf) / 2;

      pdf.addImage(imgData, 'JPEG', x, y, imgWidthInPdf, imgHeightInPdf);
      pdf.save(
        `${formData.form.first_name}${formData.form.last_name}-${formData.form.event_name}.pdf`
      );
    });
  }

  return (
    <>
      <NavBar />
      <div ref={formRef}>
        <Box p={4} spacing={4} bg="gray.100" w="50%" mx="auto" borderRadius="lg">
          <Stack>
            <FormControl>
              <FormLabel>Student Travel Registration Form - Day Trip (Student)</FormLabel>
            </FormControl>
            <HStack>
              <FormControl flex="3">
                <FormLabel htmlFor="event_name">Event Name</FormLabel>
                <Input value={formData.form.event_name} isReadOnly />
              </FormControl>
              <FormControl flex="1">
                {/* Decreased flex value for less space */}
                <FormLabel htmlFor="event_date">Event Date</FormLabel>
                <Input value={formatDate(formData.form.event_date) || ''} isReadOnly />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl>
                <FormLabel htmlFor="host_organization">Host Organization/Department</FormLabel>
                <Input value={formData.form.host_organization || ''} isReadOnly />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="departure_time">Departure Time</FormLabel>
                <Input value={formatTime(formData.form.departure_time) || ''} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="approximate_return_time">Approximate Return Time</FormLabel>
                <Input value={formatTime(formData.form.approximate_return_time) || ''} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="minimum_age_requirement">Minimum Age Requirement</FormLabel>
                <Input value={formData.form.minimum_age_requirement || ''} isReadOnly />
              </FormControl>
            </HStack>
            {/* Participant Information (Student) - Section 1 */}
            <FormLabel htmlFor="first_name" style={{ color: 'blue' }}>
              1. PARTICIPANT INFORMATION (STUDENT)
            </FormLabel>
            <HStack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <Input value={formData.form.first_name || ''} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="last_name">Last Name</FormLabel>
                <Input value={formData.form.last_name || ''} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="kuid">KUID</FormLabel>
                <Input value={formData.form.kuid || ''} isReadOnly />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input value={formData.form.email || ''} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
                <Input value={formatPhoneNumber(formData.form.phone_number) || ''} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="date_of_birth">Date of Birth</FormLabel>
                <Input value={formatDate(formData.form.date_of_birth) || ''} isReadOnly />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="current_address">Current Address</FormLabel>
                <Input value={formData.form.current_address || ''} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input value={formData.form.city || ''} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="state">State</FormLabel>
                <Input value={formData.form.state || ''} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="zip">ZIP Code</FormLabel>
                <Input value={formData.form.zip || ''} isReadOnly />
              </FormControl>
            </HStack>
            {/* Release and Indemnification Agreement for student travel - Section 2 */}
            <FormLabel style={{ color: 'blue' }}>
              2. RELEASE AND INDEMNIFICATION AGREEMENT FOR STUDENT TRAVEL
            </FormLabel>
            <FormControl display="flex" alignItems="center">
              <Checkbox defaultChecked={formData.form.agree_to_release || ''} isReadOnly>
                I agree to the Release and Indemnification Agreement
              </Checkbox>
            </FormControl>
            {/* Parent/Guardian Information for Underage Participants - Part of Section 2*/}
            {age < 18 && (
              <Box>
                <Text>Parent/Guardian Information (Required for participants under 18)</Text>
                <HStack>
                  <FormControl>
                    <FormLabel htmlFor="parent_name">Parent/Guardian&apos;s Name</FormLabel>
                    <Input value={formData.form.parent_name || ''} isReadOnly />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="parent_signature">
                      Parent/Guardian&apos;s Signature
                    </FormLabel>
                    <Input value={formData.form.parent_signature || ''} isReadOnly />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="parent_signature_date">Date</FormLabel>
                    <Input
                      value={formatDate(formData.form.parent_signature_date) || ''}
                      isReadOnly
                    />
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel htmlFor="parent_contact_number">
                    Parent/Guardian&apos;s Contact Number
                  </FormLabel>
                  <Input
                    value={formatPhoneNumber(formData.form.parent_contact_number) || ''}
                    isReadOnly
                  />
                </FormControl>
              </Box>
            )}
            {/* Participant Conduct Agreement - Section 3 */}
            <FormLabel style={{ color: 'blue' }}>3. PARTICIPANT CONDUCT AGREEMENT</FormLabel>
            <FormControl>
              <Checkbox defaultChecked={formData.form.agree_to_conduct || ''} isReadOnly>
                I agree to the Participant Conduct Agreement
              </Checkbox>
            </FormControl>
            {/* Transportation- section 4 */}
            <FormLabel style={{ color: 'blue' }}>
              4. ARE YOU UTILIZING THE KEAN UNIVERSITY PROVIDED TRANSPORTATION AS A PART OF THE
              EVENT/ACTIVITY?
            </FormLabel>
            <FormControl>
              <FormLabel>Are you utilizing the Kean University provided transportation?</FormLabel>
              {/* FIXME using value of transportation_waiver which isn't required */}
              <RadioGroup defaultValue={formData.form.transportation_waiver ? 'no' : 'yes'}>
                <Stack direction="row">
                  <Radio value="yes" isReadOnly>
                    Yes
                  </Radio>
                  <Radio value="no" isReadOnly>
                    No
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            {formData.form.transportation_waiver && (
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  name="transportationWaiver"
                  defaultChecked={formData.form.transportation_waiver || ''}
                  isReadOnly
                >
                  I agree to the Transportation Waiver
                </Checkbox>
              </FormControl>
            )}
            {/* FERPA - Section 5 */}
            <FormControl>
              <FormLabel style={{ color: 'blue' }}>
                5. FERPA (FAMILY EDUCATIONAL RIGHTS AND PRIVACY ACT) INFORMATION RELEASE
              </FormLabel>
              <Checkbox defaultChecked={formData.form.agree_to_ferpa || ''} isReadOnly>
                I agree to the FERPA Information Release
              </Checkbox>
            </FormControl>
            {/* Student Financial Obligation - Section 6 */}
            <FormLabel style={{ color: 'blue' }}>
              6. STUDENT FINANCIAL OBLIGATION ACKNOWLEDGEMENT
            </FormLabel>
            <FormControl>
              <FormLabel>Financial Obligation</FormLabel>
              <RadioGroup defaultValue={formData.form.financial_obligation ? 'yes' : 'no'}>
                <Stack direction="row">
                  <Radio isReadOnly value="no">
                    Not Applicable
                  </Radio>
                  <Radio isReadOnly value="yes">
                    Required: Complete Student Financial Obligation Acknowledgement Below.
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            {formData.form.financial_obligation && (
              <>
                <HStack>
                  <FormControl>
                    <FormLabel>Paid Ticket Price</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>$</InputLeftAddon>
                      <Input value={formData.form.paid_ticket_price || ''} isReadOnly />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Other Activity Costs</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>$</InputLeftAddon>
                      <Input value={formData.form.other_activity_costs || ''} isReadOnly />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Total Financial Obligation</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>$</InputLeftAddon>
                      <Input value={formData.form.total_financial_obligation || ''} isReadOnly />
                    </InputGroup>
                  </FormControl>
                </HStack>
                <FormControl>
                  <Checkbox isReadOnly defaultChecked={formData.form.financial_obligation || ''}>
                    I acknowledge the Financial Obligation
                  </Checkbox>
                </FormControl>
              </>
            )}
            {/*Emergency Contact Information - Section 7 */}
            <FormLabel style={{ color: 'blue' }}>7. EMERGENCY CONTACT INFORMATION</FormLabel>
            <FormLabel>
              {' '}
              In the event of an emergency, please write the name and contact information for the
              person that you would like us to contact for you.
            </FormLabel>
            <HStack>
              <FormControl isRequired>
                <FormLabel htmlFor="emergencyContactName">Emergency Contact Name</FormLabel>
                <Input value={formData.form.emergency_contact_name || ''} isReadOnly />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="relationToParticipant">Relationship to Participant</FormLabel>
                <Input value={formData.form.relation_to_participant || ''} isReadOnly />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl flex={1} isRequired>
                <FormLabel htmlFor="emergencyContactPhone">Emergency Contact Phone</FormLabel>
                <Input
                  value={formatPhoneNumber(formData.form.emergency_contact_phone) || ''}
                  isReadOnly
                />
              </FormControl>
              <FormControl flex={3} isRequired>
                <FormLabel htmlFor="emergencyContactAddress">
                  Emergency Contact Address (Include street, city and state)
                </FormLabel>
                <Input value={formData.form.emergency_contact_address || ''} isReadOnly />
              </FormControl>
            </HStack>
            {/* Participant certification - Section 8 */}
            <FormLabel style={{ color: 'blue' }}>8. PARTICIPANT CERTIFICATION</FormLabel>
            <Checkbox
              name="participantCertification"
              defaultChecked={formData.form.participant_certification || ''}
              isReadOnly
            >
              I certify that the provided information is accurate
            </Checkbox>
          </Stack>
        </Box>
      </div>
      <Button
        onClick={downloadPDF}
        style={{
          display: 'block',
          margin: '0 auto',
          marginTop: '5px',
        }}
      >
        Download PDF
      </Button>
    </>
  );
}
