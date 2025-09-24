import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { GuestDatabaseRecord } from '../../types/guest';

interface GuestTableProps {
    guestData: GuestDatabaseRecord[];
    totalGuests?: number;
}

const GuestTable: React.FC<GuestTableProps> = ({ guestData, totalGuests = 2847 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalGuests / itemsPerPage);

    const getAvatarColor = (index: number): string => {
        const colors = [
            'bg-blue-500',
            'bg-green-500',
            'bg-[#6B7280]',
            'bg-purple-500',
            'bg-yellow-500',
            'bg-teal-500',
            'bg-orange-500',
            'bg-pink-500'
        ];
        return colors[index % colors.length];
    };

    // Custom SVG Icons
    const EyeIcon = () => (
        <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.57744 0.125C6.36807 0.125 4.59893 1.13125 3.31104 2.32891C2.03135 3.51562 1.17549 4.9375 0.770801 5.91367C0.680566 6.12969 0.680566 6.37031 0.770801 6.58633C1.17549 7.5625 2.03135 8.98438 3.31104 10.1711C4.59893 11.3687 6.36807 12.375 8.57744 12.375C10.7868 12.375 12.556 11.3687 13.8438 10.1711C15.1235 8.98164 15.9794 7.5625 16.3868 6.58633C16.477 6.37031 16.477 6.12969 16.3868 5.91367C15.9794 4.9375 15.1235 3.51562 13.8438 2.32891C12.556 1.13125 10.7868 0.125 8.57744 0.125ZM4.63994 6.25C4.63994 5.20571 5.05478 4.20419 5.79321 3.46577C6.53163 2.72734 7.53315 2.3125 8.57744 2.3125C9.62173 2.3125 10.6233 2.72734 11.3617 3.46577C12.1001 4.20419 12.5149 5.20571 12.5149 6.25C12.5149 7.29429 12.1001 8.29581 11.3617 9.03423C10.6233 9.77266 9.62173 10.1875 8.57744 10.1875C7.53315 10.1875 6.53163 9.77266 5.79321 9.03423C5.05478 8.29581 4.63994 7.29429 4.63994 6.25ZM8.57744 4.5C8.57744 5.46523 7.79268 6.25 6.82744 6.25C6.6333 6.25 6.44736 6.21719 6.27236 6.15977C6.12197 6.11055 5.94697 6.20352 5.95244 6.36211C5.96064 6.55078 5.98799 6.73945 6.03994 6.92812C6.41455 8.32812 7.85557 9.15938 9.25557 8.78477C10.6556 8.41016 11.4868 6.96914 11.1122 5.56914C10.8087 4.43438 9.80518 3.67148 8.68955 3.625C8.53096 3.61953 8.43799 3.7918 8.48721 3.94492C8.54463 4.11992 8.57744 4.30586 8.57744 4.5Z" fill="#0F5A62" />
        </svg>
    );

    const MoreHorizontalIcon = () => (
        <svg width="4" height="13" viewBox="0 0 4 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.84375 9.09375C1.43764 9.09375 1.04816 9.25508 0.760993 9.54224C0.473828 9.82941 0.3125 10.2189 0.3125 10.625C0.3125 11.0311 0.473828 11.4206 0.760993 11.7078C1.04816 11.9949 1.43764 12.1562 1.84375 12.1562C2.24986 12.1562 2.63934 11.9949 2.92651 11.7078C3.21367 11.4206 3.375 11.0311 3.375 10.625C3.375 10.2189 3.21367 9.82941 2.92651 9.54224C2.63934 9.25508 2.24986 9.09375 1.84375 9.09375ZM1.84375 4.71875C1.43764 4.71875 1.04816 4.88008 0.760993 5.16724C0.473828 5.45441 0.3125 5.84389 0.3125 6.25C0.3125 6.65611 0.473828 7.04559 0.760993 7.33276C1.04816 7.61992 1.43764 7.78125 1.84375 7.78125C2.24986 7.78125 2.63934 7.61992 2.92651 7.33276C3.21367 7.04559 3.375 6.65611 3.375 6.25C3.375 5.84389 3.21367 5.45441 2.92651 5.16724C2.63934 4.88008 2.24986 4.71875 1.84375 4.71875ZM3.375 1.875C3.375 1.46889 3.21367 1.07941 2.92651 0.792243C2.63934 0.505078 2.24986 0.34375 1.84375 0.34375C1.43764 0.34375 1.04816 0.505078 0.760993 0.792243C0.473828 1.07941 0.3125 1.46889 0.3125 1.875C0.3125 2.28111 0.473828 2.67059 0.760993 2.95776C1.04816 3.24492 1.43764 3.40625 1.84375 3.40625C2.24986 3.40625 2.63934 3.24492 2.92651 2.95776C3.21367 2.67059 3.375 2.28111 3.375 1.875Z" fill="#9CA3AF" />
        </svg>
    );

    const ChevronLeftIcon = () => (
        <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.350098 6.13213C0.00830078 6.47393 0.00830078 7.029 0.350098 7.3708L5.6001 12.6208C5.94189 12.9626 6.49697 12.9626 6.83877 12.6208C7.18057 12.279 7.18057 11.7239 6.83877 11.3821L2.20674 6.7501L6.83604 2.11807C7.17783 1.77627 7.17783 1.22119 6.83604 0.879395C6.49424 0.537598 5.93916 0.537598 5.59736 0.879395L0.347363 6.1294L0.350098 6.13213Z" fill="#6B7280" />
        </svg>
    );

    const ChevronRightIcon = () => (
        <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.74307 6.13213C7.08486 6.47393 7.08486 7.029 6.74307 7.3708L1.49307 12.6208C1.15127 12.9626 0.596191 12.9626 0.254395 12.6208C-0.0874023 12.279 -0.0874023 11.7239 0.254395 11.3821L4.88643 6.7501L0.257129 2.11807C-0.084668 1.77627 -0.084668 1.22119 0.257129 0.879395C0.598926 0.537598 1.154 0.537598 1.4958 0.879395L6.7458 6.1294L6.74307 6.13213Z" fill="#6B7280" />
        </svg>
    );

    const handleViewGuest = (guest: GuestDatabaseRecord): void => {
        navigate('/guests/guest-database/' + guest.id, { state: { guest } });
    };

    const handleGuestActions = (guestId: number): void => {
        console.log('Guest actions:', guestId);
        // Add your actions logic here
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#111827]">Guest Information</h2>
                <span className="text-sm text-[#6B7280]">
                    Showing 1-10 of {totalGuests.toLocaleString()} guests
                </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2 text-sm font-medium text-[#6B7280] tracking-wider">
                                Guest Name
                            </th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-[#6B7280] tracking-wider">
                                Email Address
                            </th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-[#6B7280] tracking-wider">
                                Total Spending
                            </th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-[#6B7280] tracking-wider">
                                Total Stays
                            </th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-[#6B7280] tracking-wider">
                                Total Nights
                            </th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-[#6B7280] tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {guestData.map((guest, index) => (
                            <tr key={guest.id} className="hover:bg-gray-50">
                                <td className="py-4 px-2">
                                    <div className="flex items-center">
                                        <div className={`w-10 h-10 rounded-full ${getAvatarColor(index)} flex items-center justify-center text-white text-sm font-medium mr-3`}>
                                            {guest.avatar}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-[#111827]">{guest.name}</div>
                                            <div className="text-sm text-[#6B7280]">{guest.phone}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-2 text-sm text-[#111827]">
                                    {guest.email}
                                </td>
                                <td className="py-4 px-2 text-sm font-medium text-[#111827]">
                                    ${guest.totalSpending.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="py-4 px-2 text-sm text-[#111827]">
                                    {guest.totalStays}
                                </td>
                                <td className="py-4 px-2 text-sm text-[#111827]">
                                    {guest.totalNights}
                                </td>
                                <td className="py-4 px-2">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleViewGuest(guest)}
                                            className="p-1 text-[#0F5A62] hover:text-teal-800"
                                            title="View guest details"
                                        >
                                            <EyeIcon />
                                        </button>
                                        <button
                                            onClick={() => handleGuestActions(guest.id)}
                                            className="p-1 text-[#9CA3AF] hover:text-gray-600"
                                            title="More actions"
                                        >
                                            <MoreHorizontalIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-6">
                <div className="">
                    <p>Row per page</p>
                </div>
                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-[#6B7280]">
                        Showing 1 to 10 of {totalGuests.toLocaleString()} 
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className="p-2 rounded-md text-[#6B7280] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage === 1}
                        >
                            <ChevronLeftIcon />
                        </button>

                        <button
                            className="px-4 py-2 rounded-[4px] bg-[#000000] text-white text-[14px] font-medium"
                        >
                            1
                        </button>
                        <button
                            onClick={() => setCurrentPage(2)}
                            className="px-4 py-2 rounded-[2px] text-gray-700 hover:bg-gray-50 text-[14px]"
                        >
                            2
                        </button>
                        <button
                            onClick={() => setCurrentPage(3)}
                            className="px-4 py-2 rounded-[2px] text-gray-700 hover:bg-gray-50 text-[14px]"
                        >
                            3
                        </button>
                        <span className="px-2 text-[#6B7280]">...</span>
                        <button
                            onClick={() => setCurrentPage(285)}
                            className="px-4 py-2 rounded-[2px] text-gray-700 hover:bg-gray-50 text-[14px]"
                        >
                            285
                        </button>

                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            className="p-2 rounded-[2px] text-[#6B7280] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRightIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuestTable;