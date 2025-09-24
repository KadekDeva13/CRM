import { useState } from 'react';
import Card from "../../components/UI/card";
import GuestTable from '../../components/UI/GuestTable';
import type { GuestDatabaseRecord } from '../../types/guest';
import { guestData } from '../../data/guestData';

type SortOption = 'Total Spending' | 'Most recent' | 'Name A-Z' | 'Last active';

export default function GuestDatabasePage(){
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('All guest');
    const [sortBy, setSortBy] = useState<SortOption>('Total Spending');

    const filteredAndSortedData: GuestDatabaseRecord[] = guestData
        .filter((guest: GuestDatabaseRecord) => {
            const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                guest.phone.includes(searchTerm);
            
            return matchesSearch;
        })
        .sort((a: GuestDatabaseRecord, b: GuestDatabaseRecord) => {
            switch (sortBy) {
                case 'Total Spending':
                    return b.totalSpending - a.totalSpending;
                case 'Most recent':
                    return b.id - a.id; // Using ID as a proxy for recency
                case 'Name A-Z':
                    return a.name.localeCompare(b.name);
                case 'Last active':
                    return b.totalNights - a.totalNights; // Using nights as proxy for activity
                default:
                    return 0;
            }
        });

    return (
        <div className="p-6 min-h-[calc(100vh-64px)] text-zinc-900">
            {/* Page Header */}
            <div className="mb-[16px]">
                <h1 className="text-[28px] font-semibold">Guest Database</h1>
                <p className="text-sm text-zinc-600 mt-2">
                    Manage and track all guest information and stay history
                </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white grid grid-cols-1 xl:grid-cols-12 px-[16px] py-[25px] rounded-[8px] gap-4 mb-[17px]">
                <div className="col-span-1 xl:col-span-7">
                    <p className="mb-[8px] text-[14px]">Search Guests</p>
                    <div className="flex items-center rounded-[8px] border-1 border-[#D1D5DB] px-[12px] py-[6px] xl:py-[13px]">
                        <svg
                            className="w-5 h-5 text-[#9CA3AF] mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            className="w-full bg-transparent text-[#ADAEBC] outline-none text-[16px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="hidden xl:grid col-span-1"></div>

                <div className="col-span-1 xl:col-span-4 grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <p className="mb-[8px] text-[14px]">Status</p>
                        <div className="relative">
                            <select 
                                className="w-full appearance-none bg-white border border-gray-300 rounded-[8px] px-[12px] py-[6px] xl:py-[13px] text-[16px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option>All guest</option>
                                <option>Active</option>
                                <option>Inactive</option>
                                <option>VIP</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 
              1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <p className="mb-[8px] text-[14px]">Sort By</p>
                        <div className="relative">
                            <select 
                                className="w-full appearance-none bg-white border border-gray-300 rounded-[8px] px-[12px] py-[6px] xl:py-[13px] text-[16px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                            >
                                <option>Total Spending</option>
                                <option>Most recent</option>
                                <option>Name A-Z</option>
                                <option>Last active</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 
              111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 
              010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-[19px] mb-6">
                <Card
                    title="Total Guests"
                    value="2,847"
                    variant="icon"
                    className="col-span-1"
                    icon={
                        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#E0F2FE]">
                            <svg
                                width="20"
                                height="16"
                                viewBox="0 0 20 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.5 0C5.16304 0 5.79893 0.263392 6.26777 0.732233C6.73661 1.20107 7 1.83696 7 2.5C7 3.16304 6.73661 3.79893 6.26777 4.26777C5.79893 4.73661 5.16304 5 4.5 5C3.83696 5 3.20107 4.73661 2.73223 4.26777C2.26339 3.79893 2 3.16304 2 2.5C2 1.83696 2.26339 1.20107 2.73223 0.732233C3.20107 0.263392 3.83696 0 4.5 0ZM16 0C16.663 0 17.2989 0.263392 17.7678 0.732233C18.2366 1.20107 18.5 1.83696 18.5 2.5C18.5 3.16304 18.2366 3.79893 17.7678 4.26777C17.2989 4.73661 16.663 5 16 5C15.337 5 14.7011 4.73661 14.2322 4.26777C13.7634 3.79893 13.5 3.16304 13.5 2.5C13.5 1.83696 13.7634 1.20107 14.2322 0.732233C14.7011 0.263392 15.337 0 16 0ZM0 9.33438C0 7.49375 1.49375 6 3.33437 6H4.66875C5.16562 6 5.6375 6.10938 6.0625 6.30312C6.02187 6.52812 6.00313 6.7625 6.00313 7C6.00313 8.19375 6.52812 9.26562 7.35625 10C7.35 10 7.34375 10 7.33437 10H0.665625C0.3 10 0 9.7 0 9.33438ZM12.6656 10C12.6594 10 12.6531 10 12.6438 10C13.475 9.26562 13.9969 8.19375 13.9969 7C13.9969 6.7625 13.975 6.53125 13.9375 6.30312C14.3625 6.10625 14.8344 6 15.3313 6H16.6656C18.5063 6 20 7.49375 20 9.33438C20 9.70312 19.7 10 19.3344 10H12.6656ZM7 7C7 6.20435 7.31607 5.44129 7.87868 4.87868C8.44129 4.31607 9.20435 4 10 4C10.7956 4 11.5587 4.31607 12.1213 4.87868C12.6839 5.44129 13 6.20435 13 7C13 7.79565 12.6839 8.55871 12.1213 9.12132C11.5587 9.68393 10.7956 10 10 10C9.20435 10 8.44129 9.68393 7.87868 9.12132C7.31607 8.55871 7 7.79565 7 7ZM4 15.1656C4 12.8656 5.86562 11 8.16562 11H11.8344C14.1344 11 16 12.8656 16 15.1656C16 15.625 15.6281 16 15.1656 16H4.83437C4.375 16 4 15.6281 4 15.1656Z"
                                    fill="#0F5A62"
                                />
                            </svg>
                        </div>
                    }
                />
                <Card
                    title="No-email Guest"
                    value="184"
                    variant="icon"
                    className="col-span-1"
                    icon={
                        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#E0F2FE]">
                            <svg
                                width="18"
                                height="16"
                                viewBox="0 0 18 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.90254 0.5625C9.73692 0.21875 9.38692 0 9.00255 0C8.61817 0 8.27129 0.21875 8.10254 0.5625L6.09317 4.69688L1.60567 5.35938C1.23067 5.41563 0.91817 5.67812 0.802545 6.0375C0.68692 6.39687 0.78067 6.79375 1.04942 7.05937L4.30567 10.2812L3.53692 14.8344C3.47442 15.2094 3.63067 15.5906 3.94005 15.8125C4.24942 16.0344 4.65879 16.0625 4.99629 15.8844L9.00567 13.7437L13.015 15.8844C13.3525 16.0625 13.7619 16.0375 14.0713 15.8125C14.3807 15.5875 14.5369 15.2094 14.4744 14.8344L13.7025 10.2812L16.9588 7.05937C17.2275 6.79375 17.3244 6.39687 17.2057 6.0375C17.0869 5.67812 16.7775 5.41563 16.4025 5.35938L11.9119 4.69688L9.90254 0.5625Z"
                                    fill="#0F5A62"
                                />
                            </svg>
                        </div>
                    }
                />
                <Card
                    title="Active This Month"
                    value="423"
                    variant="icon"
                    className="col-span-1"
                    icon={
                        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#E0F2FE]">
                            <svg
                                width="14"
                                height="16"
                                viewBox="0 0 14 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 0C4.55312 0 5 0.446875 5 1V2H9V1C9 0.446875 9.44687 0 10 0C10.5531 0 11 0.446875 11 1V2H12.5C13.3281 2 14 2.67188 14 3.5V5H0V3.5C0 2.67188 0.671875 2 1.5 2H3V1C3 0.446875 3.44688 0 4 0ZM0 6H14V14.5C14 15.3281 13.3281 16 12.5 16H1.5C0.671875 16 0 15.3281 0 14.5V6ZM10.2812 9.53125C10.575 9.2375 10.575 8.7625 10.2812 8.47188C9.9875 8.18125 9.5125 8.17813 9.22188 8.47188L6.25313 11.4406L4.78438 9.97188C4.49063 9.67813 4.01562 9.67813 3.725 9.97188C3.43437 10.2656 3.43125 10.7406 3.725 11.0312L5.725 13.0312C6.01875 13.325 6.49375 13.325 6.78438 13.0312L10.2812 9.53125Z"
                                    fill="#0F5A62"
                                />
                            </svg>
                        </div>
                    }
                />
                <Card
                    title="Avg. Spending"
                    value="$2,450"
                    variant="icon"
                    className="col-span-1"
                    icon={
                        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#E0F2FE]">
                            <svg
                                width="10"
                                height="16"
                                viewBox="0 0 10 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.00005 0C5.55317 0 6.00005 0.446875 6.00005 1V2.11562C6.05005 2.12187 6.09692 2.12812 6.14692 2.1375C6.15942 2.14062 6.1688 2.14062 6.1813 2.14375L7.6813 2.41875C8.22505 2.51875 8.58442 3.04063 8.48442 3.58125C8.38442 4.12187 7.86255 4.48438 7.32192 4.38438L5.83755 4.1125C4.85942 3.96875 3.99692 4.06563 3.39067 4.30625C2.78442 4.54688 2.54067 4.87812 2.48442 5.18437C2.42192 5.51875 2.4688 5.70625 2.52192 5.82188C2.57817 5.94375 2.69379 6.08125 2.92192 6.23438C3.43129 6.56875 4.21255 6.7875 5.22505 7.05625L5.31567 7.08125C6.20942 7.31875 7.30317 7.60625 8.11567 8.1375C8.55942 8.42812 8.97817 8.82187 9.23755 9.37187C9.50317 9.93125 9.55942 10.5563 9.43754 11.2219C9.22192 12.4094 8.40317 13.2031 7.38755 13.6187C6.95942 13.7937 6.4938 13.9062 6.00005 13.9625V15C6.00005 15.5531 5.55317 16 5.00005 16C4.44692 16 4.00005 15.5531 4.00005 15V13.9094C3.98755 13.9062 3.97192 13.9062 3.95942 13.9031H3.95317C3.19067 13.7844 1.93755 13.4563 1.0938 13.0813C0.59067 12.8562 0.362545 12.2656 0.587545 11.7625C0.812545 11.2594 1.40317 11.0312 1.9063 11.2563C2.55942 11.5469 3.63442 11.8344 4.25629 11.9312C5.25317 12.0781 6.07505 11.9937 6.6313 11.7656C7.15942 11.55 7.40005 11.2375 7.4688 10.8625C7.52817 10.5312 7.4813 10.3406 7.42817 10.225C7.3688 10.1 7.25317 9.9625 7.02192 9.80937C6.50942 9.475 5.72505 9.25625 4.70942 8.9875L4.62192 8.96562C3.7313 8.72812 2.63755 8.4375 1.82505 7.90625C1.3813 7.61562 0.96567 7.21875 0.706295 6.66875C0.443795 6.10938 0.39067 5.48438 0.51567 4.81875C0.74067 3.625 1.63442 2.85 2.65005 2.44688C3.06567 2.28125 3.52192 2.16875 4.00005 2.10313V1C4.00005 0.446875 4.44692 0 5.00005 0Z"
                                    fill="#0F5A62"
                                />
                            </svg>
                        </div>
                    }
                />
            </div>

            {/* Guest Table */}
            <GuestTable 
                guestData={filteredAndSortedData} 
                totalGuests={2847}
            />
        </div>
    );
}