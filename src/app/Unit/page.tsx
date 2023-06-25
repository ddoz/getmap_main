'use client';

import Layout from '@/components/Layout';
import DeleteModal from '@/components/elements/DeleteModal';
import SidebarModal from '@/components/elements/SidebarModal';
import TextBox from '@/components/elements/TextBox';
import { units } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { BsPencil, BsPlusCircle, BsTrash} from 'react-icons/bs'
import { RiLoader2Fill, RiLoaderFill } from 'react-icons/ri';

interface UnitProps {
  data: units[];
}

export default function UnitPage({ data }:UnitProps ) {
	  const [units, setUnits] = useState(data || []);
    const [loading, setLoading] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const {data:session} = useSession();
    const [unitName, setUnitName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUnitId, setEditUnitId] = useState<number | null>(null);
    const [deleteUnitId, setDeleteUnitId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const toggleModal = () => {
      setEditUnitId(null);
      setUnitName("");
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
      fetch(`/api/unit`, {
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
          setUnits(json);
          setTotalPages(json.totalPages);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [session, currentPage, pageSize, searchTerm]);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchTerm(unitName);
    setLoading(true);
    const accessToken = session?.user.accessToken;
    const params = {
      page: '1',
      pageSize: pageSize.toString(),
      search: unitName,
    };
    fetch(`/api/unit`, {
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
        setUnits(json);
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
  fetch(`/api/unit`, {
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
      setUnits(json);
      setTotalPages(json.totalPages);
    })
    .finally(() => {
      setLoading(false);
    });
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const accessToken = session?.user.accessToken;

    if (!unitName) {
      setError('Nama unit harus diisi.');
      return;
    }

    if (editUnitId) {
      setIsLoadingForm(true);
      // Mode edit
      const updatedUnit = {
        id: editUnitId,
        unitName: unitName,
      };
  
      fetch(`/api/unit/${editUnitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken!,
        },
        body: JSON.stringify(updatedUnit),
      })
        .then((response) => response.json())
        .then((json) => {
          setIsLoadingForm(false);
          setError('');
          // Handle response data setelah update unit
          console.log('Unit updated:', json);
          // Lakukan pembaruan pada data units
          const updatedUnits = units.map((unit) =>
            unit.id === json.id ? json : unit
          );
          setUnits(updatedUnits);
          // Setelah berhasil, tutup SidebarModal
          setIsModalOpen(false);
        })
        .catch((error) => {
          setError('Error updating unit');
          // Handle error pada saat update unit
          console.error('Error updating unit:', error);
          setIsLoadingForm(false);
        });
    } else {
      // Mode tambah
      const newUnit = {
        unitName: unitName,
      };
      setIsLoadingForm(true);
  
      fetch('/api/unit/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken!,
        },
        body: JSON.stringify(newUnit),
      })
        .then((response) => response.json())
        .then((json) => {
          setIsLoadingForm(false);
          setError('');
          // Handle response data setelah tambah unit
          console.log('New unit added:', json);
          // Tambahkan unit baru ke data units
          setUnits([...units, json]);
          // Setelah berhasil, tutup SidebarModal
          setIsModalOpen(false);
        })
        .catch((error) => {
          setIsLoadingForm(false);
          // Handle error pada saat tambah unit
          setError('Error adding unit');
          console.error('Error adding unit:', error);
        });
    }
  
    setUnitName('');
  };
  

  const handleEdit = (unitId: number, unitName: string) => {
    setEditUnitId(unitId);
    setUnitName(unitName);
    setIsModalOpen(true);
  };

  const handleDelete = (unitId: number) => {
    setDeleteUnitId(unitId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
      const accessToken = session?.user.accessToken;
      fetch(`/api/unit/${deleteUnitId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken!,
        },
      })
        .then((response) => response.json())
        .then(() => {
          // Handle response data setelah hapus unit
          console.log('Unit deleted:', deleteUnitId);
          setIsDeleteModalOpen(false);
          // Hapus unit dari data units
          const updatedUnits = units.filter((unit) => unit.id !== deleteUnitId);
          setUnits(updatedUnits);
        })
        .catch((error) => {
          setIsDeleteModalOpen(false);
          // Handle error pada saat hapus unit
          console.error('Error deleting unit:', error);
        });
    
  }

    return (
      <Layout>
      <h2 className="text-xl font-bold mb-4">List Unit</h2>
      <div className='p-2 bg-white rounded shadow'>
        <div className='flex felx-row justify-between'>
          <button onClick={toggleModal} className="flex items-center bg-light-tosca text-white rounded-md p-2 mb-4">
            <BsPlusCircle className='text-white' />
          </button>
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="mr-2">
              <input
                placeholder='Cari Nama Unit'
                className={`border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500
                  ${error && "border-red-500 border animate-shake rounded"}`}
                onChange={(e) => { setUnitName(e.target.value) }}
                id='unitName'
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
                <th className="px-4 py-2 border-b">Nama Unit</th>
                <th className="px-4 py-2 border-b">*</th>
              </tr>
            </thead>
            <tbody>
              {units ? (units.map((unit, index) => (
                <tr key={unit.id}>
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{unit.unitName}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleEdit(unit.id, unit.unitName)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      <BsPencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(unit.id)}
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

            <h3 className="text-lg font-semibold">{editUnitId ? 'Edit Unit' : 'Add Unit'}</h3>
            <div className="mt-2 text-red-500">{error}</div>
            <div>
              <TextBox id='unitName' type='text' lableText='Nama Unit' value={unitName} onChange={(e) => setUnitName(e.target.value)} />
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
              {editUnitId ? 'Update' : 'Submit'}
            </button>
          </form>
      </SidebarModal>
      )}
    </Layout>
    )
  
}