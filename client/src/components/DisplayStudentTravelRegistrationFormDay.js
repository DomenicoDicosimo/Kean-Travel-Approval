import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import axios from 'axios';
// import { useUser } from '@clerk/clerk-react';
import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  HStack,
  Text,
  Checkbox,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
export default function DisplayStudentTravelRegistrationFormDay({
  userEmail,
  formId,
  usingUniversityTransport,
  isUnderage,
}) {
  const [formData, setFormData] = useState(null);
  // const { user } = useUser();
  // const userEmail = user?.emailAddresses[0]?.emailAddress;
  DisplayStudentTravelRegistrationFormDay.propTypes = {
    userEmail: PropTypes.string,
    formId: PropTypes.string,
    usingUniversityTransport: PropTypes.bool,
    isUnderage: PropTypes.bool,
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

  // function calculateAge(date_of_birth) {
  //   const dob = new Date(date_of_birth);
  //   const today = new Date();
  //   let age = today.getFullYear() - dob.getFullYear();
  //   const numMonths = today.getMonth() - dob.getMonth();
  //   if (numMonths < 0 || (numMonths === 0 && today.getDate() < dob.getDate())) {
  //     age--;
  //   }
  //   return age;
  // }
  // const age = calculateAge(formData.form.date_of_birth);

  function formatDate(date) {
    const dateObj = new Date(date);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${month}/${day}/${year}`;
  }

  function formatDateTime(dateTime) {
    const timeObj = new Date(dateTime);
    let hours = timeObj.getHours().toString().padStart(2, '0');
    let minutes = timeObj.getMinutes().toString().padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${formatDate(dateTime)} ${hours}:${minutes} ${ampm}`;
  }

  function formatPhoneNumber(phoneNumber) {
    var cleaned = ('' + phoneNumber).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

  return (
    <>
      <NavBar />
      <Box p={4} spacing={4} bg="gray.100" w="50%" mx="auto" borderRadius="lg">
        <Stack>
          <FormControl>
            <FormLabel>Student Travel Registration Form - Day Trip (Student)</FormLabel>
          </FormControl>
          <HStack>
            <FormControl flex="3">
              <FormLabel htmlFor="event_name">Event Name</FormLabel>
              <Text>{formData.form.event_name}</Text>
            </FormControl>

            <FormControl flex="1">
              {/* Decreased flex value for less space */}
              <FormLabel htmlFor="event_date">Event Date</FormLabel>
              <Text>{formatDate(formData.form.event_date)}</Text>
            </FormControl>
          </HStack>

          <HStack>
            <FormControl>
              <FormLabel htmlFor="host_organization">Host Organization/Department</FormLabel>
              <Text>{formData.form.host_organization}</Text>
            </FormControl>
          </HStack>

          <HStack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="departure_time">Departure Time</FormLabel>
              {/* <Text>{formData.form.departure_time}</Text> */}
              <Text>{formatDateTime(formData.form.departure_time)}</Text>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="approximate_return_time">Approximate Return Time</FormLabel>
              <Text>{formatDateTime(formData.form.approximate_return_time)}</Text>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="minimum_age_requirement">Minimum Age Requirement</FormLabel>
              <Text>{formData.form.minimum_age_requirement}</Text>
            </FormControl>
          </HStack>

          {/* Participant Information (Student) - Section 1 */}
          <FormLabel htmlFor="first_name" style={{ color: 'blue' }}>
            1. PARTICIPANT INFORMATION (STUDENT)
          </FormLabel>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="first_name">First Name</FormLabel>
              <Text>{formData.form.first_name}</Text>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="last_name">Last Name</FormLabel>
              <Text>{formData.form.last_name}</Text>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="kuid">KUID</FormLabel>
              <Text>{formData.form.kuid}</Text>
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Text>{formData.form.email}</Text>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
              <Text>{formatPhoneNumber(formData.form.phone_number)}</Text>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="date_of_birth">Date of Birth</FormLabel>
              <Text>{formatDate(formData.form.date_of_birth)}</Text>
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="current_address">Current Address</FormLabel>
              <Text>{formData.form.current_address}</Text>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="city">City</FormLabel>
              <Text>{formData.form.city}</Text>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="state">State</FormLabel>
              <Text>{formData.form.state}</Text>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="zip">ZIP Code</FormLabel>
              <Text>{formData.form.zip}</Text>
            </FormControl>
          </HStack>

          {/* Release and Indemnification Agreement for student travel - Section 2 */}
          <FormLabel style={{ color: 'blue' }}>
            2. RELEASE AND INDEMNIFICATION AGREEMENT FOR STUDENT TRAVEL
          </FormLabel>
          <FormControl display="flex" alignItems="center">
            <Checkbox defaultChecked={formData.form.agree_to_release} isReadOnly>
              I agree to the Release and Indemnification Agreement
            </Checkbox>
          </FormControl>

          {/* Parent/Guardian Information for Underage Participants - Part of Section 2*/}
          {isUnderage && (
            <Box>
              <Text>Parent/Guardians Information (Required for participants under 18)</Text>
              <HStack>
                <FormControl>
                  <FormLabel htmlFor="parent_name">Parent/Guardian Name</FormLabel>
                  <Text>{formData.form.parent_name}</Text>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="parent_signature">Parent/Guardian Signature</FormLabel>
                  <Text>{formData.form.parent_signature}</Text>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="parent_signature_date">Date</FormLabel>
                  <Text>{formatDate(formData.form.parent_signature_date)}</Text>
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel htmlFor="parent_contact_number">
                  Parent/Guardian Contact Number
                </FormLabel>
                <Text>{formatPhoneNumber(formData.form.parent_contact_number)}</Text>
              </FormControl>
            </Box>
          )}

          {/* Participant Conduct Agreement - Section 3 */}
          <FormLabel style={{ color: 'blue' }}>3. PARTICIPANT CONDUCT AGREEMENT</FormLabel>
          <FormControl>
            <Checkbox defaultChecked={formData.form.agree_to_conduct} isReadOnly>
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
            <RadioGroup defaultValue={usingUniversityTransport ? 'yes' : 'no'}>
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

          {!usingUniversityTransport && (
            <FormControl display="flex" alignItems="center">
              <Checkbox
                name="transportationWaiver"
                isChecked={formData.form.transportationWaiver}
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
            <Checkbox defaultChecked={formData.form.agree_to_ferpa} isReadOnly>
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
                  Required: Complete Studdent Financial Obligation Acknowledgement Below.
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          {formData.form.financial_obligation && (
            <>
              <HStack>
                <FormControl>
                  <FormLabel>Paid Ticket Price</FormLabel>
                  <Text>${formData.form.paid_ticket_price}</Text>
                </FormControl>
                <FormControl>
                  <FormLabel>Other Activity Costs</FormLabel>
                  <Text>${formData.form.other_activity_costs}</Text>
                </FormControl>

                <FormControl>
                  <FormLabel>Total Financial Obligation</FormLabel>
                  <Text>${formData.form.total_financial_obligation}</Text>
                </FormControl>
              </HStack>

              <FormControl>
                <Checkbox isReadOnly defaultChecked={formData.form.financial_obligation}>
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
              <Text>{formData.form.emergency_contact_name}</Text>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="relationToParticipant">Relationship to Participant</FormLabel>
              <Text>{formData.form.relation_to_participant}</Text>
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl flex={1} isRequired>
              <FormLabel htmlFor="emergencyContactPhone">Emergency Contact Phone</FormLabel>
              <Text>{formatPhoneNumber(formData.form.emergency_contact_phone)}</Text>
            </FormControl>
            <FormControl flex={3} isRequired>
              <FormLabel htmlFor="emergencyContactAdress">
                Emergency Contact Address (Include street, city and state)
              </FormLabel>
              <Text>{formData.form.emergency_contact_address}</Text>
            </FormControl>
          </HStack>

          {/* Participant certification - Section 8 */}
          <FormLabel style={{ color: 'blue' }}>8. PARTICIPANT CERTIFICATION</FormLabel>
          <Checkbox
            name="participantCertification"
            defaultChecked={formData.form.participant_certification}
            isReadOnly
          >
            I certify that the provided information is accurate
          </Checkbox>
        </Stack>
      </Box>
    </>
  );
}
