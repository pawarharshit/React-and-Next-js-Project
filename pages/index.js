import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Next Meetups</title>
        <meta name="desciptions" content="List of React Next Meetups"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />{" "}
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an api
//   return {
//     props:{
//       meetups : DUMMY_MEETUPS},
//   };
// }

export async function getStaticProps() {
  // fetch data from an api

  const client = await MongoClient.connect(
    "mongodb+srv://harshit:harshit26@cluster0.lz2kj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
