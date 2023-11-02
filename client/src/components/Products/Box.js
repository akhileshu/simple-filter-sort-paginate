import {
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Card,
} from "@chakra-ui/react";
import React from "react";

function Box({ item }) {

  return (
    
      <Card maxW="xs" marginTop={"20px"}>
        <CardBody>
          <Image
            src={item.image}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{item.name}</Heading>
            <Text>{item.description}</Text>
            <Text color="blue.600" fontSize="2xl">
              ${item.price}
            </Text>
          </Stack>
        </CardBody>
        
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    )
 
}

export default Box;
