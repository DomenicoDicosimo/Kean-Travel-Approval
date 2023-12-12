import React, { useRef } from 'react';
import { Box, FormControl, FormLabel, Input, Checkbox, Stack, Button, HStack, RadioGroup, Radio, Text, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import PropTypes from 'prop-types';


const DisplayForms = ({ formData }) => {
    const formRef = useRef();

    if (!formData) {
        return <div>Loading...</div>;
    }

    const formatTime = (timeString) => {
        if (!timeString) return 'N/A';
        const dummyDate = '1970-01-01T'; // Dummy date
        return new Date(dummyDate + timeString).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false 
        });
      };
    

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
            `${formData.first_name}${formData.last_name}-${formData.event_name}.pdf`
          );
        });
      }

    function formatDate(date) {
        const dateObj = new Date(date);
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObj.getDate().toString().padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${month}/${day}/${year}`;
    }

    function formatPhoneNumber(phoneNumber) {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }

    return (
        <>
          <div ref={formRef}>
            <Box p={4} spacing={4} bg="gray.100" w="60%" mx="auto" borderRadius="lg">
                <Stack>
                    <FormControl>
                        <FormLabel>Student Travel Registration Form - Day Trip (Student)</FormLabel>
                    </FormControl>

                    <HStack>
                        <FormControl flex="3">
                            <FormLabel htmlFor="event_name">Event Name</FormLabel>
                            <Input value={formData.event_name || ''} isReadOnly />
                        </FormControl>
                        <FormControl flex="1">
                            <FormLabel htmlFor="event_date">Event Date</FormLabel>
                            <Input value={formatDate(formData.event_date) || ''} isReadOnly />
                        </FormControl>
                    </HStack>

                    <FormControl>
                        <FormLabel htmlFor="host_organization">Host Organization/Department</FormLabel>
                        <Input value={formData.host_organization || ''} isReadOnly />
                    </FormControl>

                    <HStack spacing={4}>
                        <FormControl>
                            <FormLabel htmlFor="departure_time">Departure Time</FormLabel>
                            <Input value={formatTime(formData.departure_time) || ''} isReadOnly />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="approximate_return_time">Approximate Return Time</FormLabel>
                            <Input value={formatTime(formData.approximate_return_time) || ''} isReadOnly />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="minimum_age_requirement">Minimum Age Requirement</FormLabel>
                            <Input value={formData.minimum_age_requirement || ''} isReadOnly />
                        </FormControl>
                    </HStack>

                    <FormLabel htmlFor="first_name" style={{ color: 'blue' }}>1. PARTICIPANT INFORMATION (STUDENT)</FormLabel>
                    <HStack spacing={4}>
                        <FormControl>
                            <FormLabel htmlFor="first_name">First Name</FormLabel>
                            <Input value={formData.first_name || ''} isReadOnly />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="last_name">Last Name</FormLabel>
                            <Input value={formData.last_name || ''} isReadOnly />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="kuid">KUID</FormLabel>
                            <Input value={formData.kuid || ''} isReadOnly />
                        </FormControl>
                    </HStack>

                    <HStack spacing={4}>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input value={formData.email || ''} isReadOnly />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
                            <Input value={formatPhoneNumber(formData.phone_number) || ''} isReadOnly />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="date_of_birth">Date of Birth</FormLabel>
                            <Input value={formatDate(formData.date_of_birth) || ''} isReadOnly />
                        </FormControl>
                    </HStack>

                    <HStack spacing={4}>
                        <FormControl>
                            <FormLabel htmlFor="current_address">Current Address</FormLabel>
                            <Input value={formData.current_address || ''} isReadOnly />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="city">City</FormLabel>
                            <Input value={formData.city || ''} isReadOnly />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="state">State</FormLabel>
                            <Input value={formData.state || ''} isReadOnly />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="zip">ZIP Code</FormLabel>
                            <Input value={formData.zip || ''} isReadOnly />
                        </FormControl>
                    </HStack>

                    <FormControl display="flex" alignItems="center">
                        <Checkbox defaultChecked={formData.agree_to_release} isReadOnly>
                            I agree to the Release and Indemnification Agreement
                        </Checkbox>
                    </FormControl>

                    {formData.isUnderage && (
                        <Box>
                            <Text>Parent/Guardian Information (Required for participants under 18)</Text>
                            <HStack>
                                <FormControl>
                                    <FormLabel htmlFor="parent_name">Parent/Guardian&apos;s Name</FormLabel>
                                    <Input value={formData.parent_name || ''} isReadOnly />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="parent_signature">Parent/Guardian&apos;s Signature</FormLabel>
                                    <Input value={formData.parent_signature || ''} isReadOnly />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="parent_signature_date">Date</FormLabel>
                                    <Input value={formatDate(formData.parent_signature_date) || ''} isReadOnly />
                                </FormControl>
                            </HStack>

                            <FormControl>
                                <FormLabel htmlFor="parent_contact_number">Parent/Guardian&apos;s Contact Number</FormLabel>
                                <Input value={formatPhoneNumber(formData.parent_contact_number) || ''} isReadOnly />
                            </FormControl>
                        </Box>
                    )}

                    <FormControl>
                        <Checkbox defaultChecked={formData.agree_to_conduct} isReadOnly>
                            I agree to the Participant Conduct Agreement
                        </Checkbox>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Are you utilizing the Kean University provided transportation?</FormLabel>
                        <RadioGroup defaultValue={formData.usingUniversityTransport ? 'yes' : 'no'}>
                            <Stack direction="row">
                                <Radio value="yes" isReadOnly>Yes</Radio>
                                <Radio value="no" isReadOnly>No</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>

                    {formData.usingUniversityTransport && (
                        <FormControl display="flex" alignItems="center">
                            <Checkbox isChecked={formData.transportationWaiver} isReadOnly>
                                I agree to the Transportation Waiver
                            </Checkbox>
                        </FormControl>
                    )}

                    <FormControl>
                        <Checkbox defaultChecked={formData.agree_to_ferpa} isReadOnly>
                            I agree to the FERPA Information Release
                        </Checkbox>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Financial Obligation</FormLabel>
                        <RadioGroup defaultValue={formData.financial_obligation ? 'yes' : 'no'}>
                            <Stack direction="row">
                                <Radio isReadOnly value="no">Not Applicable</Radio>
                                <Radio isReadOnly value="yes">Required: Complete Student Financial Obligation Acknowledgement Below.</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>

                    {formData.financial_obligation && (
                        <>
                            <HStack>
                                <FormControl>
                                    <FormLabel>Paid Ticket Price</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>$</InputLeftAddon>
                                        <Input value={formData.paid_ticket_price || ''} isReadOnly />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Other Activity Costs</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>$</InputLeftAddon>
                                        <Input value={formData.other_activity_costs || ''} isReadOnly />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Total Financial Obligation</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>$</InputLeftAddon>
                                        <Input value={formData.total_financial_obligation || ''} isReadOnly />
                                    </InputGroup>
                                </FormControl>
                            </HStack>

                            <FormControl>
                                <Checkbox isReadOnly defaultChecked={formData.financial_obligation}>
                                    I acknowledge the Financial Obligation
                                </Checkbox>
                            </FormControl>
                        </>
                    )}

                    <FormControl>
                        <FormLabel>Emergency Contact Name</FormLabel>
                        <Input value={formData.emergency_contact_name || ''} isReadOnly />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Relationship to Participant</FormLabel>
                        <Input value={formData.relation_to_participant || ''} isReadOnly />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Emergency Contact Phone</FormLabel>
                        <Input value={formatPhoneNumber(formData.emergency_contact_phone) || ''} isReadOnly />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Emergency Contact Address</FormLabel>
                        <Input value={formData.emergency_contact_address || ''} isReadOnly />
                    </FormControl>

                    <FormControl>
                        <Checkbox defaultChecked={formData.participant_certification} isReadOnly>
                            I certify that the provided information is accurate
                        </Checkbox>
                    </FormControl>
                </Stack>
            </Box>
            </div>

            <Button onClick={downloadPDF}>Download PDF</Button>
        </>
    );
};


DisplayForms.propTypes = {
  formData: PropTypes.shape({
      event_name: PropTypes.string,
      event_date: PropTypes.string,
      host_organization: PropTypes.string,
      departure_time: PropTypes.string,
      approximate_return_time: PropTypes.string,
      minimum_age_requirement: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      kuid: PropTypes.string,
      email: PropTypes.string,
      phone_number: PropTypes.string,
      date_of_birth: PropTypes.string,
      current_address: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zip: PropTypes.string,
      agree_to_release: PropTypes.bool,
      agree_to_conduct: PropTypes.bool,
      usingUniversityTransport: PropTypes.bool,
      transportationWaiver: PropTypes.bool,
      agree_to_ferpa: PropTypes.bool,
      financial_obligation: PropTypes.bool,
      paid_ticket_price: PropTypes.number,
      other_activity_costs: PropTypes.number,
      total_financial_obligation: PropTypes.number,
      emergency_contact_name: PropTypes.string,
      relation_to_participant: PropTypes.string,
      emergency_contact_phone: PropTypes.string,
      emergency_contact_address: PropTypes.string,
      participant_certification: PropTypes.bool,
      parent_name: PropTypes.string,
      parent_signature: PropTypes.string,
      parent_signature_date: PropTypes.string,
      parent_contact_number: PropTypes.string,
      isUnderage: PropTypes.bool,
      form: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        event_name: PropTypes.string,
      }),
     
  })
};


export default DisplayForms;
