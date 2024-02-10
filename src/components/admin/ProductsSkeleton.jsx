import {
  Box,
  Flex,
  Grid,
  GridItem,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

export default function ProductsSkeleton() {
  let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return (
    <div>
      <Grid
        pt={"140px"}
        p={{ base: "10px", sm: "15px", md: "25px", lg: "35px" }}
        flexWrap={"wrap"}
        gap={"10px"}
        gridTemplateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
          "2xl": "repeat(5, 1fr)",
        }}
      >
        {arr.map((item, i) => {
          return (
            <GridItem
              borderRadius="lg"
              p="4"
              border="1px solid #E0E0E0"
              mb="4"
              key={i}
              boxShadow="0px 0px 10px gray"
              display={"flex"}
              flexDirection="column"
              justifyContent="space-between"
            >
              <SkeletonCircle
                size="10"
                borderRadius={"10px"}
                h="350px"
                w={"100%"}
              />
              <SkeletonText
                w={"100%"}
                mt="4"
                noOfLines={8}
                spacing="4"
                skeletonHeight="2"
              />
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
}
