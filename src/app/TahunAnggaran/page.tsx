'use client';

import Layout from '@/components/Layout';
import DeleteModal from '@/components/elements/DeleteModal';
import SidebarModal from '@/components/elements/SidebarModal';
import TextBox from '@/components/elements/TextBox';
import { fiscalYears } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { BsPencil, BsPlusCircle, BsTrash} from 'react-icons/bs'
import { RiLoader2Fill, RiLoaderFill } from 'react-icons/ri';

interface TahunAnggaranProps {
  data: fiscalYears[];
}

export default function TahunAnggaranPage({ data }:TahunAnggaranProps ) {
	const [fiscalYears, setFiscalyear] = useState(data || []);
    const [loading, setLoading] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const {data:session} = useSession();

    //form
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [status, setStatus] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editFiscalyearId, setEditFiscalyearId] = useState<number | null>(null);
    const [deleteFiscalYearId, setDeleteFiscalyearId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const initForm = ()=>{
        setName("");
        setYear('');
        setStatus('');
    }

    const toggleModal = () => {
      setEditFiscalyearId(null);
      initForm();
      setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
      setLoading(true);
      const accessToken = session?.user.accessToken;
      const params = {
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
        search: searchTerm,
      };
      fetch(`/api/fiscalyear`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: accessToken!,
        },
        body: JSON.stringify(params),
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((json) => {
          setFiscalyear(json);
          setTotalPages(json.totalPages);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [session, currentPage, pageSize, searchTerm]);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchTerm(name);
    setLoading(true);
    const accessToken = session?.user.accessToken;
    const params = {
      page: '1',
      pageSize: pageSize.toString(),
      search: name,
    };
    fetch(`/api/fiscalyear`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: accessToken!,
      },
      body: JSON.stringify(params),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((json) => {
        setFiscalyear(json);
        setTotalPages(json.totalPages);
      })
      .finally(() => {
        setLoading(false);
      });
  };

const handlePagination = (page: number) => {
  setCurrentPage(page);
  setLoading(true);
  const accessToken = session?.user.accessToken;
  const params = {
    page: page.toString(),
    pageSize: pageSize.toString(),
    search: searchTerm,
  };
  fetch(`/api/fiscalyear`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: accessToken!,
    },
    body: JSON.stringify(params),
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((json) => {
      setFiscalyear(json);
      setTotalPages(json.totalPages);
    })
    .finally(() => {
      setLoading(false);
    });
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const accessToken = session?.user.accessToken;

    if (!name) {
      setError('Nama harus diisi.');
      return;
    }
    if (!year) {
        setError('Tahun harus diisi.');
        return;
    }

    if (editFiscalyearId) {
      setIsLoadingForm(true);
      // Mode edit
      const updatedData = {
        id: editFiscalyearId,
        name: name,
        year: parseInt(year),
        status: parseInt(status)
      };
  
      fetch(`/api/fiscalyear/${editFiscalyearId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken!,
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then((json) => {
          setIsLoadingForm(false);
          setError('');
          // Handle response data setelah update data
          console.log('Data updated:', json);
          // Lakukan pembaruan pada data
          const updatedData = fiscalYears.map((data) =>
            data.id === json.id ? json : data
          );
          setFiscalyear(updatedData);
          // Setelah berhasil, tutup SidebarModal
          setIsModalOpen(false);
        })
        .catch((error) => {
          setError('Error updating data');
          // Handle error pada saat update data
          console.error('Error updating data:', error);
          setIsLoadingForm(false);
        });
    } else {
      // Mode tambah
      const newData = {
        name: name,
        year: parseInt(year),
        status: parseInt(status)
      };
      setIsLoadingForm(true);
  
      fetch('/api/fiscalyear/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken!,
        },
        body: JSON.stringify(newData),
      })
        .then((response) => response.json())
        .then((json) => {
          setIsLoadingForm(false);
          setError('');
          // Handle response data setelah tambah data
          console.log('New data added:', json);
          // Tambahkan data baru ke data
          setFiscalyear([...fiscalYears, json]);
          // Setelah berhasil, tutup SidebarModal
          setIsModalOpen(false);
        })
        .catch((error) => {
          setIsLoadingForm(false);
          // Handle error pada saat tambah data
          setError('Error adding data');
          console.error('Error adding data:', error);
        });
    }
  
    initForm();
  };
  

  const handleEdit = (fiscalyearId: number, name: string, year: string, status: string) => {
    setEditFiscalyearId(fiscalyearId);
    setName(name);
    setYear(year);
    setStatus(status);
    setIsModalOpen(true);
  };

  const handleDelete = (fiscalYearId: number) => {
    setDeleteFiscalyearId(fiscalYearId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
      const accessToken = session?.user.accessToken;
      fetch(`/api/fiscalyear/${deleteFiscalYearId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken!,
        },
      })
        .then((response) => response.json())
        .then(() => {
          // Handle response data setelah hapus data
          console.log('Data deleted:', deleteFiscalYearId);
          setIsDeleteModalOpen(false);
          // Hapus data dari data data
          const updatedData = fiscalYears.filter((data) => data.id !== deleteFiscalYearId);
          setFiscalyear(updatedData);
        })
        .catch((error) => {
          setIsDeleteModalOpen(false);
          // Handle error pada saat hapus data
          console.error('Error deleting data:', error);
        });
    
  }

    return (
      <Layout>
      <h2 className="text-xl font-bold mb-4">List Tahun Anggaran</h2>
      <div className='p-2 bg-white rounded shadow'>
        <div className='flex felx-row justify-between'>
          <button onClick={toggleModal} className="flex items-center bg-light-tosca text-white rounded-md p-2 mb-4">
            <BsPlusCircle className='text-white' />
          </button>
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="mr-2">
              <input
                placeholder='Cari Nama Anggaran'
                className={`border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500
                  ${error && "border-red-500 border animate-shake rounded"}`}
                onChange={(e) => { setName(e.target.value) }}
                id='namaAnggaran'
              />
            </div>
          </form>
        </div>

        
        <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900">
              <RiLoaderFill />
            </div>
          </div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">No</th>
                <th className="px-4 py-2 border-b">Nama Tahun Anggaran</th>
                <th className="px-4 py-2 border-b">Tahun</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">*</th>
              </tr>
            </thead>
            <tbody>
              {fiscalYears ? (fiscalYears.map((data, index) => (
                <tr key={data.id}>
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{data.name}</td>
                  <td className="px-4 py-2 border-b">{data.year}</td>
                  <td className="px-4 py-2 border-b">{(data.status)?"Ya":"Tidak"}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleEdit(data.id, data.name, data.year.toString(), (data.status)?"1":"0")}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      <BsPencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <BsTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))):(<tr>
                <td className="px-4 py-2 border-b" colSpan={3}>
                  No Data Found
                </td>
              </tr>)}
            </tbody>
          </table>
        )}

          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`${
                  index + 1 === currentPage ? 'bg-indigo-500 text-white' : ''
                } mx-1 px-4 py-2 rounded-md`}
                onClick={() => handlePagination(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Modal konfirmasi hapus */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteConfirmed={handleDeleteConfirmed}
      />
      
      {isModalOpen && (
        <SidebarModal isOpen={isModalOpen} toggleModal={toggleModal}>
          <form onSubmit={handleSubmit}>

            <h3 className="text-lg font-semibold">{editFiscalyearId ? 'Edit Tahun Anggaran' : 'Add Tahun Anggaran'}</h3>
            <div className="mt-2 text-red-500">{error}</div>
            <div className='mt-4'>
              <TextBox id='name' type='text' lableText='Nama Tahun Anggaran' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mt-2'>
              <TextBox id='year' type='text' lableText='Tahun' value={year} onChange={(e) => setYear(e.target.value)} />
            </div>
            <div className={"mt-2 relative"}>
                <label
                    className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base"
                    htmlFor={"statusForm"}
                >
                 Status
                </label>
                <div className="flex items-stretch">
                    <select value={(status)?"1":"0"} onChange={(e) => setStatus(e.target.value)} name="status" id="statusForm" className={`border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base rounded-md bg-slate-50 focus:shadow focus:shadow-blue-500`}>
                        <option value="">Pilih Status</option>
                        <option value="0">Tidak</option>
                        <option value="1">Ya</option>
                    </select>
                </div>
            </div>
            <button className={`mt-4 px-4 py-2 bg-dark-tosca text-white rounded-lg flex items-center justify-center ${
                  isLoadingForm ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type="submit"
                disabled={isLoadingForm}>
              {isLoadingForm ? (
                <RiLoader2Fill className="animate-spin w-4 h-4 mr-2" />
              ) : (
                <BsPlusCircle className="w-5 h-5 mr-2" />
              )}
              {editFiscalyearId ? 'Update' : 'Submit'}
            </button>
          </form>
      </SidebarModal>
      )}
    </Layout>
    )
  
}