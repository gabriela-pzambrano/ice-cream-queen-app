import { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { deleteUser } from '../../api/deleteUser';
import { getUsers } from '../../api/getUsers';
import { searchUsers } from '../../api/searchUsers';
import TableUsers from '../../components/TableUsers';
import ModalCreate from '../../components/ModalCreate';

const Users = ({users, setUsers, token, limit, page, setPage, paginacion, setPaginacion }) => {
  const [email, setEmail] = useState();
  const [refresh, setRefresh] = useState();
  const [open, setOpen] = useState(false);
  const dataUsers = (response) => {
    setPaginacion(response);
    setUsers(response.users);
  };
  const handleSubmit = async () => {
    const searchData = await searchUsers(token, email);
    console.log(searchData);
    setPaginacion(searchData);
    setUsers(searchData);
  };

  const refreshUsers = () => {
    setRefresh(true);
    setPage({
      ...page,
      users: 1,
    });
  };

  const userDelete = (id) => {
    deleteUser(token, id);
    setRefresh(true);
    setPage({
      ...page,
      users: 1,
    });
  }

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleSubmit();
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  useEffect(() => {
    getUsers(token, limit, page.users).then((response) => dataUsers(response));
    setRefresh(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, refresh]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);


  return (
    <>
    <ModalCreate open={open} setOpen={setOpen} token={token} setPage={setPage} page={page}/>
      <div className="flex flex-1 flex-col items-stretch overflow-hidden bg-background">
        {!users ? (
          <section className="flex flex-col flex-1 overflow-y-auto justify-center items-center">
            <MutatingDots
              height="100"
              width="100"
              color="#7671D6"
              secondaryColor="#5751CD"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <h2 className="font-bold text-primary-500 text-lg">Cargando...</h2>
          </section>
        ) :  (
          <main className="flex-1 overflow-y-auto">
            <TableUsers users={users} page={page} setPage={setPage} paginacion={paginacion} handleChange={handleChange} refresh={refreshUsers} deleteUser={userDelete} setOpen={setOpen}/>
          </main>
          )
        }
      </div>
    </>
  );
};

export default Users;

