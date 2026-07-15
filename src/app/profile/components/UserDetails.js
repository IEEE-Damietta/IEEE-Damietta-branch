
const UserDetails = ({username}) => {
  return (
    <div className="flex flex-col items-center text-center">
        <img src="/images/anonymous-profile.jpg" alt="" className='rounded-full size-24'/>
        <div className="pt-4 text-xl">
          <h2>{username}</h2>
          <p className="text-ieee-primary font-bold">IEEE User</p>
        </div>
    </div>
  );
}

export default UserDetails