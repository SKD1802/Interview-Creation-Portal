import Moment from "react-moment";
import { Link } from "react-router-dom";

import useGetUpcomingInterviews from "../hooks/useGetUpcomingInterviews";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useState } from "react";

const Participants = ({ name, email }) => {
  return <div className="grid grid-cols-2 mb-2">
    <div>
      {name}
    </div>
    <div>
      {email}
    </div>
  </div>
};

const Interviews = ({ startTime, endTime, _id, usersInvited }) => {

  const [showParticipants, setShowParticipants] = useState(false);

  return <div className="flex flex-col p-4 border-4 rounded-md m-4">
    <div className="grid grid-cols-2 mb-2">
      <div><b>Id: </b>{_id} </div>
      <div>
        <b>Date: </b><Moment format="DD-MM-YYYY">{endTime}</Moment>
      </div>
    </div>
    <div className="grid grid-cols-2 mb-2">
      <div>
        <b> Start Time:</b> <Moment format="hh:mm A">{startTime}</Moment>
      </div>
      <div>
        <b>  End Time:</b> <Moment format="hh:mm A">{endTime}</Moment>
      </div>
    </div>
    <hr />
    <div className="my-3">
      <b className="underline cursor-pointer select-none" onClick={() => { setShowParticipants(prevState => !prevState) }}>{showParticipants ? 'Hide' : 'View'} Participants</b>
    </div>
    {
      showParticipants &&
      <>
        <div className="grid grid-cols-2 mb-2">
          <div>
            <b>Name </b>
          </div>
          <div>
            <b> Email </b>
          </div>
        </div>
        <>
          {
            usersInvited.map((user) => {
              return <Participants
                email={user.email}
                key={user.email}
                name={user.name}
              />
            })
          }
        </>
      </>
    }

    <Link
      to={`/edit/${_id}`}
      className="btn-sm mt-4 w-fix mx-auto bg-primaryColor text-white"
    >
      Edit
    </Link>
  </div>
}

const UpcomingInterviews = () => {
  useDocumentTitle("Upcoming Interviews");
  const { status, data, error } = useGetUpcomingInterviews();
  console.log(data)


  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12">
        {status === "loading" && <div>Loading...</div>}
        {status === "error" && <div>Error fetching upcoming interviews</div>}
        {status === "success" && (
          <>
            <h2 className="text-2xl mb-8 font-bold text-center">
              Upcoming Interviews
            </h2>
            {
              data.interviews.length <= 0 && <div className="flex flex-col p-4 text-center border-4 rounded-md m-4">
                No Interviews Scheduled
              </div>
            }
            {data.interviews.map(({ startTime, endTime, _id, usersInvited }) => (
              <Interviews
                key={_id}
                _id={_id}
                startTime={startTime}
                endTime={endTime}
                usersInvited={usersInvited}
              />
            ))}
          </>
        )}
      </div>
    </main>
  );
};

export default UpcomingInterviews;
