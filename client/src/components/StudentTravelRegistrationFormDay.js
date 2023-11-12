import React, { useState } from 'react';
import NavBar from "./NavBar";
import {
    Box,
    Input,
    FormControl,
    FormLabel,
    Button,
    Flex,
    Stack,
    HStack,
    Checkbox,
    Collapse,
    Text,
    Radio,
    RadioGroup, 
  
} from "@chakra-ui/react";

export default function Forms() {
  
  const [showReleaseText, setShowReleaseText] = useState(false);
  const [showSection_3_details, setSection_3_details] = useState(false);
  const [showSection_4_details, setSection_4_details] = useState(false);
  const [usingUniversityTransport, setUsingUniversityTransport] = useState('');
  const [isUnderage, setIsUnderage] = useState(false);
  const [formData, setFormData] = useState({
    event_name: '',
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
    transportationWaiver: false,
    agreeToFerpa: false,
    financialObligation: false,
    participantCertification: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleTransportationChange = (value) => {
    setUsingUniversityTransport(value);
  };
  

  const handleDateOfBirthChange = (e) => {
    handleInputChange(e); // existing input change handler
    const dob = new Date(e.target.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    setIsUnderage(age < 18);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit  = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/submit-student-travel-registration-form-day', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  };


  return (
    <>
      <NavBar />
      <Box p={4}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4} bg="gray.50" w="50%" mx="auto" borderRadius="lg" p={6}>
            <HStack>
              <FormControl isRequired flex="3"> {/* Increased flex value for more space */}
                <FormLabel htmlFor="event_name">Event Name</FormLabel>
                <Input type="text" id="event_name" name="event_name" placeholder="Event Name" onChange={handleInputChange} value={formData.event_name} />
              </FormControl>
           
              <FormControl isRequired flex="1"> {/* Decreased flex value for less space */}
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input type="date" id="date" name="date" onChange={handleInputChange} />
              </FormControl>
            </HStack>

            <FormControl >
            <FormControl isRequired>
                <FormLabel htmlFor="host_organization">Host Organization/Department</FormLabel>
                <Input type="text" id="host_organization" name="host_organization" placeholder="Host/Organization" onChange={handleInputChange} value={formData.host_organization} />
              </FormControl>
            </FormControl>

            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="departure_time">Departure Time</FormLabel>
                <Input type="datetime-local" id="departure_time" name="departure_time" placeholder="Departure Time" onChange={handleInputChange} value={formData.departure_time} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="approximate_return_time">Approximate Return Time</FormLabel>
                <Input type="datetime-local" id="approximate_return_time" name="approximate_return_time" placeholder="Approximate Return Time" onChange={handleInputChange} value={formData.approximate_return_time} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="minimum_age_requirement">Minimum Age Requirement</FormLabel>
                <Input type="text" id="minimum_age_requirement" name="minimum_age_requirement" placeholder="Minimum Age Requirement" onChange={handleInputChange} value={formData.minimum_age_requirement} />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel  style={{ color: 'skyblue' }}>1. PARTICIPANT INFORMATION (STUDENT)</FormLabel>
            </FormControl>
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <Input type="text" id="first_name" name="first_name" placeholder="First Name" onChange={handleInputChange} value={formData.first_name} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="last_name">Last Name</FormLabel>
                <Input type="text" id="last_name" name="last_name" placeholder="Last Name" onChange={handleInputChange} value={formData.last_name} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="kuid">KUID</FormLabel>
                <Input type="text" id="kuid" name="kuid" placeholder="KUID" onChange={handleInputChange} value={formData.kuid} />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input type="email" id="email" name="email" placeholder="Email" onChange={handleInputChange} value={formData.email} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
                <Input type="text" id="phone_number" name="phone_number" placeholder="Phone Number" onChange={handleInputChange} value={formData.phone_number} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="date_of_birth">Date of Birth</FormLabel>
                <Input type="date" id="date_of_birth" name="date_of_birth" onChange={handleDateOfBirthChange} value={formData.date_of_birth} />
              </FormControl>        
            </HStack>
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="current_address">Current Address</FormLabel>
                <Input type="text" id="current_address" name="current_address" placeholder="Current Address" onChange={handleInputChange} value={formData.current_address} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input type="text" id="city" name="city" placeholder="City" onChange={handleInputChange} value={formData.city} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="state">State</FormLabel>
                <Input type="text" id="state" name="state" placeholder="State" onChange={handleInputChange} value={formData.state} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="zip">ZIP Code</FormLabel>
                <Input type="text" id="zip" name="zip" placeholder="ZIP Code" onChange={handleInputChange} value={formData.zip} />
              </FormControl>
            </HStack>

            {/* RELEASE AND INDEMNIFICATION SECTION 2 */}
            <FormLabel  style={{ color: 'skyblue' }}>2. RELEASE AND INDEMNIFICATION AGREEMENT FOR STUDENT TRAVEL</FormLabel>
             <FormControl display="flex" alignItems="center">
             <Checkbox name="agreeToRelease" isChecked={formData.agreeToRelease} onChange={handleCheckboxChange}>
                I agree to the Release and Indemnification Agreement
              </Checkbox>
              <Button size="sm" ml={2} onClick={() => setShowReleaseText(!showReleaseText)}>
                {showReleaseText ? 'Hide Details' : 'Show Details'}
              </Button>
            </FormControl>

             {/* Collapsible panel for the Release and Indemnification Agreement text */}
             <Collapse in={showReleaseText}>
              <Text fontSize="sm" p={4} borderWidth="1px" borderRadius="md">
                In the event that I incur any physical or emotional injury or illness, or loss or
                damages to personal property of any kind during my participation in the
                activity described above, I hereby expressly and voluntarily agree to hold
                harmless, from any claims related to or arising from this activity, Kean
                University, its officers, employees or students.
                I am aware of the risk associated with participation in the activity. My
                participation is voluntary, and it is my obligation to inspect the facilities and
                equipment before use to make sure that it is safe and fit for its intended
                purpose. I have verified with my medical professional that I am fit to participate
                in the activity. 
                Also, I agree that if any other person should assert such a claim arising from
                my connection with this activity, that I will substitute myself in place of Kean
                University as the party against whom the claim is to be pursued. 

                I further agree that I will pay all damages and costs resulting from such a
                claim, and that I will indemnify or reimburse Kean University in connection
                with that claim.
                This Release shall be binding on my heirs, executors, administrators and
                assign.
                I have carefully read this agreement and understand it to be a release of all
                claims and causes of action for my injury or death or damage to my property
                that occurs while participating in the described activity. I understand and
                agree that it obligates me to indemnify the parties named for any liability for
                injury or death of any person and damage to pro e caused by my negligent or
                intentional act or omission

                I hereby certify that I am eighteen years of age or older.
              </Text>
            </Collapse>

              {/* Parent/Guardian Information for Underage Participants - Part of Section 2*/}
              {isUnderage && (
              <Box>
                <Text>Parent/Guardians Information (Required for participants under 18)</Text>
                <HStack>
                  <FormControl isRequired>
                    <FormLabel htmlFor="parent_name">Parent/Guardians Name</FormLabel>
                    <Input id="parent_name" name="parent_name" onChange={handleInputChange} />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="parent_signature">Parent/Guardians Signature</FormLabel>
                    <Input id="parent_signature" name="parent_signature" onChange={handleInputChange} />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel htmlFor="parent_signature_date">Date</FormLabel>
                    <Input id="parent_signature_date" name="parent_signature_date" onChange={handleInputChange} />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="parent_contact_number">Parent/Guardian&apos;s Contact Number</FormLabel>
                    <Input id="parent_contact_number" name="parent_contact_number" onChange={handleInputChange} />
                  </FormControl>
                </HStack>
              </Box>
            )}

             {/* Participant Conduct Agreement - Section 3 */}
            <FormLabel  style={{ color: 'skyblue' }}>3. PARTICIPANT CONDUCT AGREEMENT</FormLabel>
            <FormControl>
              <Checkbox name="agreeToConduct" onChange={handleInputChange}>I agree to the Participant Conduct Agreement</Checkbox>
                <Button size="sm" ml={2} onClick={() => setSection_3_details(!showSection_3_details)}>
                    {showReleaseText ? 'Hide Details' : 'Show Details'}
                </Button>  

            </FormControl>
            <Collapse in={showSection_3_details}>
                  <Text fontSize="sm" p={4} borderWidth="1px" borderRadius="md">        
                  I shall comply with all applicable laws of any jurisdiction in which I may travel
                  and all policies of Kean University including, but not limited to, its alcohol and
                  drug free policies and the Kean University Code of Conduct, while participating
                  in the event/activity. If my participation in the event/activity is at any time
                  deemed detrimental to the event/activity or its other participants, as determined
                  by Kean University in its sole discretion, I understand that I may be expelled
                  from the event/activity with no refund of monies paid. In the event of expulsion,
                  I agree to be sent home at my own expense or the expense of one or both of
                  my parents or guardians. I agree at all times to remain under the supervision of
                  Kean University and will comply with its rules, regulations, standards and
                  instructions. I waive and release any and all claims against Kean University arising out of my failure to remain under such supervision or to comply with
                  any such rules, regulations, standards and instructions.
                  In addition, I will inform my guest(s), if applicable, of these policies and
                  procedures and their responsibility to abide by the rules and regulations. I
                  will take full responsibility for all of my guest’s actions.
                  The full Kean University Code of Conduct can be found online at:  &nbsp;
                  <a href="https://www.kean.edu/offices/community-standards-and-student-conduct/student-code-conduct" style={{ color: 'blue' }}>
                    Student-code-conduct</a>       
                  </Text>
            </Collapse>

            {/* Transportation- section 4 */}  
            <FormLabel  style={{ color: 'skyblue' }}>4. ARE YOU UTILIZING THE KEAN UNIVERSITY PROVIDED TRANSPORTATION AS A PART OF THE EVENT/ACTIVITY?</FormLabel>
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
               <FormControl display="flex" alignItems="center">
                  <Checkbox name="transportationWaiver" isChecked={formData.transportationWaiver} onChange={handleCheckboxChange}>I agree to the Transportation Waiver</Checkbox>
                  <Button size="sm" ml={2} onClick={() => setSection_4_details(!showSection_4_details)}>
                  {showReleaseText ? 'Hide Details' : 'Show Details'}
                  </Button>         
                </FormControl>
            )}
            
            <Collapse in={showSection_4_details}>
                  <Text fontSize="sm" p={4} borderWidth="1px" borderRadius="md">        
                    TRANSPORTATION WAIVER: I understand that the activity in which I will participate is voluntary and does not include
                    transportation to or from the activity. I will assume all responsibility for getting to and from the above named activity.       
                  </Text>
            </Collapse>


            {/* FERPA - Section 5 */}  
            <FormLabel  style={{ color: 'skyblue' }}>5. FERPA (FAMILY EDUCATIONAL RIGHTS AND PRIVACY ACT) INFORMATION RELEASE</FormLabel>
            <Checkbox name="agreeToFerpa" onChange={handleInputChange}>I agree to the FERPA Information Release</Checkbox>
             
            {/* Student Financial Obligation - Section 6 */}  
            <FormLabel  style={{ color: 'skyblue' }}>6. STUDENT FINANCIAL OBLIGATION ACKNOWLEDGEMENT</FormLabel>
            <Checkbox name="financialObligation" onChange={handleInputChange}>I acknowledge the Financial Obligation</Checkbox>

            
            <FormLabel  style={{ color: 'skyblue' }}>7. EMERGENCY CONTACT INFORMATION</FormLabel>
            <FormLabel  > In the event of an emergency, please write the name and contact information for the person that you would like us to contact for you.</FormLabel>

            <HStack>
              <FormControl isRequired>
                <FormLabel htmlFor="emergencyContactName">Emergency Contact Name</FormLabel>
                <Input id="emergencyContactName" name="emergencyContactName" onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="relationToParticipant">Relationship to Participant</FormLabel>
                <Input id="relationToParticipant" name="relationToParticipant" onChange={handleInputChange} />
              </FormControl>
            </HStack>

            {/* Emergency Contact Information - Section 7*/}  
            <HStack spacing={4}>
              <FormControl  flex={1}isRequired>
                <FormLabel htmlFor="emergencyContactPhone">Emergency Contact Phone</FormLabel>
                <Input id="emergencyContactPhone" name="emergencyContactPhone" onChange={handleInputChange} />
              </FormControl>
              <FormControl flex={3} isRequired>
                <FormLabel htmlFor="emergencyContactAdress">Emergency Contact Address (Include street, city and state)</FormLabel>
                <Input id="emergencyContactAdress" name="emergencyContactAdress" onChange={handleInputChange} />
              </FormControl>
            </HStack>
    
            {/* Participant certification - Section 8 */}  
            <FormLabel  style={{ color: 'skyblue' }}>8. PARTICIPANT CERTIFICATION</FormLabel>
            <Checkbox name="participantCertification" onChange={handleInputChange}>I certify that the provided information is accurate</Checkbox>

            <Flex justify="space-between">
              <Button type="submit" colorScheme="teal">Submit</Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </>
  );
}
