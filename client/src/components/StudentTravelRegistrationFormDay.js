import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';

import NavBar from './NavBar';

export default function StudentTravelRegistrationFormDay() {
  const navigate = useNavigate();

  const [showDetails, setShowDetails] = useState({
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
  });
  const [usingUniversityTransport, setUsingUniversityTransport] = useState('');
  const [financialObligationOption, setFinancialObligationOption] = useState('');
  const [isUnderage, setIsUnderage] = useState(false);
  const [formData, setFormData] = useState({
    event_name: '',
    event_date: '',
    host_organization: '',
    departure_time: '',
    approximate_return_time: '',
    minimum_age_requirement: '',
    first_name: '',
    last_name: '',
    kuid: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    current_address: '',
    city: '',
    state: '',
    zip: '',

    agreeToRelease: false,
    agreeToConduct: false,
    usingUniversityTransport: false,
    transportationWaiver: false,
    agreeToFerpa: false,
    financialObligation: false,
    participantCertification: false,
    paidTicketPrice: '',
    otherActivityCosts: '',
    totalFinancialObligation: '',

    parent_name: '',
    parent_signature: '',
    parent_signature_date: '',
    parent_contact_number: '',
    emergencyContactName: '',
    relationToParticipant: '',
    emergencyContactPhone: '',
    emergencyContactAddress: '',
  });

  const handleTransportationChange = (value) => {
    setUsingUniversityTransport(value);
  };

  const handleFinancialObligationChange = (value) => {
    setFinancialObligationOption(value);
  };

  const toggleDetail = (section) => {
    setShowDetails((prevDetails) => ({ ...prevDetails, [section]: !prevDetails[section] }));
  };

  const subtractYears = (date, years) => {
    date.setFullYear(date.getFullYear() - years);
    return date;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((currentFormData) => {
      const newValue = type === 'checkbox' ? checked : value;
      const updatedFormData = { ...currentFormData, [name]: newValue };

      //Calculate Financial Obligation
      if (name === 'paidTicketPrice' || name === 'otherActivityCosts') {
        const paidTicketPrice = parseFloat(updatedFormData.paidTicketPrice) || 0;
        const otherActivityCosts = parseFloat(updatedFormData.otherActivityCosts) || 0;
        updatedFormData.totalFinancialObligation = paidTicketPrice + otherActivityCosts;
      }

      //Get parent/guardian information if age < 18
      if (name === 'date_of_birth') {
        const dob = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        setIsUnderage(age < 18);
      }

      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      'http://127.0.0.1:5000/submit-student-travel-registration-form-day',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    console.log(`%c${usingUniversityTransport}`, 'color: green; font-weight: bold;');
    console.log(data);
    if (response.ok) {
      navigate('/dashboard');
    } else {
      console.error('Error submitting student travel registration form.');
    }
  };

  return (
    <>
      <NavBar />
      <Box p={4} spacing={4} bg="gray.100" w="50%" mx="auto" borderRadius="lg">
        <form onSubmit={handleSubmit}>
          <Stack>
            <FormControl>
              <FormLabel>Student Travel Registration Form - Day Trip (Student)</FormLabel>
            </FormControl>

            <HStack>
              <FormControl isRequired flex="3">
                {' '}
                {/* Increased flex value for more space */}
                <FormLabel htmlFor="event_name">Event Name</FormLabel>
                <Select
                  id="event_name"
                  name="event_name"
                  placeholder="Event Name"
                  onChange={handleInputChange}
                  value={formData.event_name}
                >
                  <option value="Great Minds in STEM (GMiS)">Great Minds in STEM (GMiS)</option>
                  <option value="National Conference on Undergraduate Research (NCUR)">
                    National Conference on Undergraduate Research (NCUR)
                  </option>
                  <option value="Project Presentation">Project Presentation</option>
                </Select>
              </FormControl>

              <FormControl isRequired flex="1">
                {' '}
                {/* Decreased flex value for less space */}
                <FormLabel htmlFor="event_date">Event Date</FormLabel>
                <Input
                  type="date"
                  id="event_date"
                  name="event_date"
                  min={new Date().toISOString().split('T')[0]} // Today's date
                  onChange={handleInputChange}
                  value={formData.event_date}
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="host_organization">Host Organization/Department</FormLabel>
                <Input
                  type="text"
                  id="host_organization"
                  name="host_organization"
                  placeholder="Host/Organization"
                  onChange={handleInputChange}
                  value={formData.host_organization}
                />
              </FormControl>
            </FormControl>

            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="departure_time">Departure Time</FormLabel>
                <Input
                  type="time"
                  id="departure_time"
                  name="departure_time"
                  placeholder="Departure Time"
                  onChange={handleInputChange}
                  value={formData.departure_time}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="approximate_return_time">Approximate Return Time</FormLabel>
                <Input
                  type="time"
                  id="approximate_return_time"
                  name="approximate_return_time"
                  placeholder="Approximate Return Time"
                  onChange={handleInputChange}
                  value={formData.approximate_return_time}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="minimum_age_requirement">Minimum Age Requirement</FormLabel>
                <Input
                  type="text"
                  id="minimum_age_requirement"
                  name="minimum_age_requirement"
                  placeholder="Minimum Age Requirement"
                  pattern="[0-9]{1,2}"
                  onChange={handleInputChange}
                  value={formData.minimum_age_requirement}
                />
              </FormControl>
            </HStack>

            {/* Participant Information (Student) - Section 1 */}
            <FormLabel htmlFor="first_name" style={{ color: 'blue' }}>
              1. PARTICIPANT INFORMATION (STUDENT)
            </FormLabel>
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <Input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  pattern="[a-zA-Z '\-]+"
                  onChange={handleInputChange}
                  value={formData.first_name}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="last_name">Last Name</FormLabel>
                <Input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  pattern="[a-zA-Z '\-]+"
                  onChange={handleInputChange}
                  value={formData.last_name}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="kuid">KUID</FormLabel>
                <Input
                  type="text"
                  id="kuid"
                  name="kuid"
                  placeholder="1234567"
                  pattern="[0-9]{7}"
                  onChange={handleInputChange}
                  value={formData.kuid}
                />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  pattern="[a-z0-9]+@kean\.edu$"
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon>+1</InputLeftAddon>
                  <Input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    placeholder="123-456-7890"
                    pattern="\d{10}|\d{3}-\d{3}-\d{4}|\(\d{3}\)\d{3}-\d{4}|\(\d{3}\) \d{3}-\d{4}"
                    onChange={handleInputChange}
                    value={formData.phone_number}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="date_of_birth">Date of Birth</FormLabel>
                <Input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  onChange={handleInputChange}
                  max={
                    subtractYears(new Date(), formData.minimum_age_requirement)
                      .toISOString()
                      .split('T')[0]
                  } // Constraint: Minimum age requirement
                  value={formData.date_of_birth}
                />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="current_address">Current Address</FormLabel>
                <Input
                  type="text"
                  id="current_address"
                  name="current_address"
                  placeholder="Current Address"
                  onChange={handleInputChange}
                  value={formData.current_address}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  onChange={handleInputChange}
                  value={formData.city}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="state">State</FormLabel>
                <Input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  pattern="[A-Z]{2}"
                  onChange={handleInputChange}
                  value={formData.state.toUpperCase()}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="zip">ZIP Code</FormLabel>
                <Input
                  type="text"
                  id="zip"
                  name="zip"
                  placeholder="ZIP Code"
                  pattern="[0-9]{5}"
                  onChange={handleInputChange}
                  value={formData.zip}
                />
              </FormControl>
            </HStack>

            {/* Release and Indemnification Agreement for student travel - Section 2 */}
            <FormLabel style={{ color: 'blue' }}>
              2. RELEASE AND INDEMNIFICATION AGREEMENT FOR STUDENT TRAVEL
            </FormLabel>
            <FormControl display="flex" alignItems="center">
              <Checkbox
                name="agreeToRelease"
                isChecked={formData.agreeToRelease}
                onChange={handleInputChange}
                isRequired={true}
              >
                I agree to the Release and Indemnification Agreement
              </Checkbox>
              <Button size="sm" ml={2} onClick={() => toggleDetail('section2')}>
                {showDetails.section2 ? 'Hide Details' : 'Show Details'}
              </Button>
            </FormControl>

            {/* Collapsible panel for the Release and Indemnification Agreement text */}
            <Collapse in={showDetails.section2}>
              <Text fontSize="sm" p={4} borderWidth="1px" borderRadius="md">
                In the event that I incur any physical or emotional injury or illness, or loss or
                damages to personal property of any kind during my participation in the activity
                described above, I hereby expressly and voluntarily agree to hold harmless, from any
                claims related to or arising from this activity, Kean University, its officers,
                employees or students. I am aware of the risk associated with participation in the
                activity. My participation is voluntary, and it is my obligation to inspect the
                facilities and equipment before use to make sure that it is safe and fit for its
                intended purpose. I have verified with my medical professional that I am fit to
                participate in the activity. Also, I agree that if any other person should assert
                such a claim arising from my connection with this activity, that I will substitute
                myself in place of Kean University as the party against whom the claim is to be
                pursued. I further agree that I will pay all damages and costs resulting from such a
                claim, and that I will indemnify or reimburse Kean University in connection with
                that claim. This Release shall be binding on my heirs, executors, administrators and
                assign. I have carefully read this agreement and understand it to be a release of
                all claims and causes of action for my injury or death or damage to my property that
                occurs while participating in the described activity. I understand and agree that it
                obligates me to indemnify the parties named for any liability for injury or death of
                any person and damage to pro e caused by my negligent or intentional act or omission
                I hereby certify that I am eighteen years of age or older.
              </Text>
            </Collapse>

            {/* Parent/Guardian Information for Underage Participants - Part of Section 2*/}
            {isUnderage && (
              <Box>
                <Text>Parent/Guardian Information (Required for participants under 18)</Text>
                <HStack>
                  <FormControl isRequired>
                    <FormLabel htmlFor="parent_name">Parent/Guardian&apos;s Name</FormLabel>
                    <Input
                      type="text"
                      id="parent_name"
                      name="parent_name"
                      placeholder="Parent/Guardian's Name"
                      pattern="[a-zA-Z '\-]+"
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="parent_signature">
                      Parent/Guardian&apos;s Signature
                    </FormLabel>
                    <Input
                      type="text"
                      id="parent_signature"
                      name="parent_signature"
                      placeholder="Parent/Guardian's Signature"
                      pattern="[a-zA-Z '\-]+"
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="parent_signature_date">Date</FormLabel>
                    <Input
                      type="date"
                      id="parent_signature_date"
                      name="parent_signature_date"
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </HStack>

                <FormControl isRequired>
                  <FormLabel htmlFor="parent_contact_number">
                    Parent/Guardian&apos;s Contact Number
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon>+1</InputLeftAddon>
                    <Input
                      type="tel"
                      id="parent_contact_number"
                      name="parent_contact_number"
                      placeholder="123-456-7890"
                      pattern="\d{10}|\d{3}-\d{3}-\d{4}|\(\d{3}\)\d{3}-\d{4}|\(\d{3}\) \d{3}-\d{4}"
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormControl>
              </Box>
            )}

            {/* Participant Conduct Agreement - Section 3 */}
            <FormLabel style={{ color: 'blue' }}>3. PARTICIPANT CONDUCT AGREEMENT</FormLabel>
            <FormControl>
              <Checkbox name="agreeToConduct" onChange={handleInputChange}>
                I agree to the Participant Conduct Agreement
              </Checkbox>
              <Button size="sm" ml={2} onClick={() => toggleDetail('section3')}>
                {showDetails.section3 ? 'Hide Details' : 'Show Details'}
              </Button>
            </FormControl>
            <Collapse in={showDetails.section3}>
              <Text fontSize="sm" p={4} borderWidth="1px" borderRadius="md">
                I shall comply with all applicable laws of any jurisdiction in which I may travel
                and all policies of Kean University including, but not limited to, its alcohol and
                drug free policies and the Kean University Code of Conduct, while participating in
                the event/activity. If my participation in the event/activity is at any time deemed
                detrimental to the event/activity or its other participants, as determined by Kean
                University in its sole discretion, I understand that I may be expelled from the
                event/activity with no refund of monies paid. In the event of expulsion, I agree to
                be sent home at my own expense or the expense of one or both of my parents or
                guardians. I agree at all times to remain under the supervision of Kean University
                and will comply with its rules, regulations, standards and instructions. I waive and
                release any and all claims against Kean University arising out of my failure to
                remain under such supervision or to comply with any such rules, regulations,
                standards and instructions. In addition, I will inform my guest(s), if applicable,
                of these policies and procedures and their responsibility to abide by the rules and
                regulations. I will take full responsibility for all of my guest’s actions. The full
                Kean University Code of Conduct can be found online at: &nbsp;
                <a
                  href="https://www.kean.edu/offices/community-standards-and-student-conduct/student-code-conduct"
                  style={{ color: 'blue' }}
                >
                  Student-code-conduct
                </a>
              </Text>
            </Collapse>

            {/* Transportation- section 4 */}
            <FormLabel style={{ color: 'blue' }}>
              4. ARE YOU UTILIZING THE KEAN UNIVERSITY PROVIDED TRANSPORTATION AS A PART OF THE
              EVENT/ACTIVITY?
            </FormLabel>
            <FormControl isRequired>
              <FormLabel>Are you utilizing the Kean University provided transportation?</FormLabel>
              <RadioGroup onChange={handleTransportationChange} value={usingUniversityTransport}>
                <Stack direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {usingUniversityTransport === 'no' && (
              <FormControl display="flex" alignItems="center" isRequired>
                <Checkbox
                  name="transportationWaiver"
                  isChecked={formData.transportationWaiver}
                  onChange={handleInputChange}
                >
                  I agree to the Transportation Waiver
                </Checkbox>
                <Button size="sm" ml={2} onClick={() => toggleDetail('section4')}>
                  {showDetails.section4 ? 'Hide Details' : 'Show Details'}
                </Button>
              </FormControl>
            )}

            <Collapse in={showDetails.section4}>
              <Text fontSize="sm" p={4} borderWidth="1px" borderRadius="md">
                TRANSPORTATION WAIVER: I understand that the activity in which I will participate is
                voluntary and does not include transportation to or from the activity. I will assume
                all responsibility for getting to and from the above named activity.
              </Text>
            </Collapse>

            {/* FERPA - Section 5 */}
            <FormControl>
              <FormLabel style={{ color: 'blue' }}>
                5. FERPA (FAMILY EDUCATIONAL RIGHTS AND PRIVACY ACT) INFORMATION RELEASE
              </FormLabel>
              <Checkbox name="agreeToFerpa" onChange={handleInputChange}>
                I agree to the FERPA Information Release
              </Checkbox>
              <Button size="sm" ml={2} onClick={() => toggleDetail('section5')}>
                {showDetails.section5 ? 'Hide Details' : 'Show Details'}
              </Button>
            </FormControl>
            <Collapse in={showDetails.section5}>
              I authorize Kean University to release, to my parent(s) or legal guardian(s), contact
              information and general information related to the abovementioned event/activity, in
              order for my parent/guardian to receive health, safety, and security information
              related to this program. I understand the purpose of this release is to provide
              health, welfare, and safety information to my parent(s). Further, should an incident
              occur during the event/activity, I authorize the release of my name / statement as a
              Complainant, Accused Student, or Witness during the student conduct process as
              outlined in the Kean University Student Code of Conduct. This release will remain in
              effect until revoked by me in writing and delivered to the Kean University Office of
              Student Affairs.
            </Collapse>

            {/* Student Financial Obligation - Section 6 */}
            <FormLabel style={{ color: 'blue' }}>
              6. STUDENT FINANCIAL OBLIGATION ACKNOWLEDGEMENT
            </FormLabel>
            <FormControl isRequired>
              <FormLabel>Financial Obligation</FormLabel>
              <RadioGroup
                onChange={handleFinancialObligationChange}
                value={financialObligationOption}
              >
                <Stack direction="row">
                  <Radio value="notApplicable">Not Applicable</Radio>
                  <Radio value="required">
                    Required: Complete Student Financial Obligation Acknowledgement Below.
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {financialObligationOption === 'required' && (
              <>
                <HStack>
                  <FormControl isRequired>
                    <FormLabel htmlFor="paidTicketPrice">Paid Ticket Price</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>$</InputLeftAddon>
                      <Input
                        id="paidTicketPrice"
                        name="paidTicketPrice"
                        type="number"
                        step="0.01"
                        pattern="^[0-9]+(\.[0-9]{1,2})?$"
                        onChange={handleInputChange}
                        placeholder="Enter paid ticket price"
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="otherActivityCosts">Other Activity Costs</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>$</InputLeftAddon>
                      <Input
                        id="otherActivityCosts"
                        name="otherActivityCosts"
                        type="number"
                        step="0.01"
                        pattern="^[0-9]+(\.[0-9]{1,2})?$"
                        onChange={handleInputChange}
                        placeholder="Enter other activity costs"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="totalFinancialObligation">
                      Total Financial Obligation
                    </FormLabel>
                    <InputGroup>
                      <InputLeftAddon>$</InputLeftAddon>
                      <Input
                        id="totalFinancialObligation"
                        name="totalFinancialObligation"
                        type="number"
                        value={formData.totalFinancialObligation}
                        placeholder="Total"
                        readOnly
                      />
                    </InputGroup>
                  </FormControl>
                </HStack>

                <FormControl>
                  <Checkbox name="financialObligation" onChange={handleInputChange}>
                    I acknowledge the Financial Obligation
                  </Checkbox>
                  <Button size="sm" ml={2} onClick={() => toggleDetail('section6')}>
                    {showDetails.section6 ? 'Hide Details' : 'Show Details'}
                  </Button>
                </FormControl>

                <Collapse in={showDetails.section6}>
                  <Text fontSize="sm" p={4} borderWidth="1px" borderRadius="md">
                    STUDENT FINANCIAL OBLIGATION ACKNOWLEDGEMENT: I understand and acknowledge that
                    I have paid the ticket price of ${formData.paidTicketPrice} for each ticket,
                    which represents a substantially reduced cost for the activity and may include
                    without limitation, admission ticket, bus, food, etc... I understand that the
                    University has: 1) purchased a limited amount of program admission tickets for
                    full face value; 2) reserved and paid for bus transportation; and/or 3) reserved
                    and paid for meals for the student activity. Therefore, I agree that I shall
                    have no right to a refund for any part of the ticket price that I have paid. In
                    addition, if I or my guest fail to attend and participate in the student
                    activity for any reason, I understand that I will be financially responsible to
                    the University for the full cost of the student activity which totals $
                    {formData.totalFinancialObligation} per ticket. Further, if I fail to make such
                    payment to the University, the University may, at its option, put a financial
                    hold on my record. As a result, I understand that I may be prohibited from
                    registering for future courses at the University and obtaining a release of my
                    academic transcript. The Kean University student will be financially responsible
                    to the University for the full cost of the student activity if their registered
                    guest fails to fully attend and participate in the student activity for any
                    reason
                  </Text>
                </Collapse>
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
                <Input
                  id="emergencyContactName"
                  name="emergencyContactName"
                  placeholder="Emergency Contact Name"
                  pattern="[a-zA-Z '\-]+"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="relationToParticipant">Relationship to Participant</FormLabel>
                <Input
                  id="relationToParticipant"
                  name="relationToParticipant"
                  placeholder="Relationship to Participant"
                  pattern="[a-zA-Z '\-]+"
                  onChange={handleInputChange}
                />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl flex={1} isRequired>
                <FormLabel htmlFor="emergencyContactPhone">Emergency Contact Phone</FormLabel>
                <InputGroup>
                  <InputLeftAddon>+1</InputLeftAddon>
                  <Input
                    type="tel"
                    id="emergencyContactPhone"
                    name="emergencyContactPhone"
                    placeholder="123-456-7890"
                    pattern="\d{10}|\d{3}-\d{3}-\d{4}|\(\d{3}\)\d{3}-\d{4}|\(\d{3}\) \d{3}-\d{4}"
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl flex={3} isRequired>
                <FormLabel htmlFor="emergencyContactAddress">
                  Emergency Contact Address (Include street, city and state)
                </FormLabel>
                <Input
                  id="emergencyContactAddress"
                  name="emergencyContactAddress"
                  placeholder="123 Main St, City, ST"
                  pattern="[a-zA-Z0-9 ]+,\s*[a-zA-Z ]+,\s*[A-Z]{2}"
                  onChange={handleInputChange}
                />
              </FormControl>
            </HStack>

            {/* Participant certification - Section 8 */}
            <FormLabel style={{ color: 'blue' }}>8. PARTICIPANT CERTIFICATION</FormLabel>
            <Checkbox name="participantCertification" onChange={handleInputChange}>
              I certify that the provided information is accurate
            </Checkbox>

            <Flex justify="space-between">
              <Button type="submit" colorScheme="teal">
                Submit
              </Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </>
  );
}
