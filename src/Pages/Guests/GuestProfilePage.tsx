
import { useMemo, useState, type ReactElement } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type {
    GuestDatabaseRecord,
    GuestPreferenceSection,
    GuestReview,
    GuestReviewSummary,
    // GuestStayHistory,
    GuestStayStatus,
} from '../../types/guest';
import { guestData } from '../../data/guestData';

type GuestProfileState = {
    guest?: GuestDatabaseRecord;
};

type TabKey = 'profile' | 'stay-history' | 'preferences' | 'reviews';

const TAB_ITEMS: Array<{ key: TabKey; label: string }> = [
    { key: 'profile', label: 'Profile' },
    { key: 'stay-history', label: 'Stay History' },
    { key: 'preferences', label: 'Preferences' },
    { key: 'reviews', label: 'Reviews' },
];

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

const dateFormatterLong = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

const dateFormatterShort = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
});

function formatDate(value?: string): string {
    if (!value) {
        return '-';
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return value;
    }

    return dateFormatterLong.format(parsed);
}

function formatDateShort(value: string): string {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return value;
    }

    return dateFormatterShort.format(parsed);
}

function formatList(values?: string[]): string {
    if (!values || values.length === 0) {
        return '-';
    }

    return values.join(', ');
}

const IconEmail = (): ReactElement => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1.5 0C0.671875 0 0 0.671875 0 1.5C0 1.97187 0.221875 2.41562 0.6 2.7L7.4 7.8C7.75625 8.06563 8.24375 8.06563 8.6 7.8L15.4 2.7C15.7781 2.41562 16 1.97187 16 1.5C16 0.671875 15.3281 0 14.5 0H1.5ZM0 3.5V10C0 11.1031 0.896875 12 2 12H14C15.1031 12 16 11.1031 16 10V3.5L9.2 8.6C8.4875 9.13438 7.5125 9.13438 6.8 8.6L0 3.5Z"
            fill="#4B5563"
        />
    </svg>
);

const IconPhone = (): ReactElement => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5.15312 0.768478C4.9125 0.187228 4.27812 -0.122147 3.67188 0.0434781L0.921875 0.793478C0.378125 0.943478 0 1.43723 0 1.99973C0 9.73098 6.26875 15.9997 14 15.9997C14.5625 15.9997 15.0563 15.6216 15.2063 15.0779L15.9563 12.3279C16.1219 11.7216 15.8125 11.0872 15.2312 10.8466L12.2312 9.5966C11.7219 9.3841 11.1313 9.53098 10.7844 9.9591L9.52188 11.4997C7.32188 10.4591 5.54063 8.67785 4.5 6.47785L6.04063 5.21848C6.46875 4.86848 6.61562 4.28098 6.40312 3.7716L5.15312 0.771603V0.768478Z"
            fill="#4B5563"
        />
    </svg>
);

const IconMapPin = (): ReactElement => (
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.74062 15.6C8.34375 13.5938 12 8.73125 12 6C12 2.6875 9.3125 0 6 0C2.6875 0 0 2.6875 0 6C0 8.73125 3.65625 13.5938 5.25938 15.6C5.64375 16.0781 6.35625 16.0781 6.74062 15.6ZM6 4C6.53043 4 7.03914 4.21071 7.41421 4.58579C7.78929 4.96086 8 5.46957 8 6C8 6.53043 7.78929 7.03914 7.41421 7.41421C7.03914 7.78929 6.53043 8 6 8C5.46957 8 4.96086 7.78929 4.58579 7.41421C4.21071 7.03914 4 6.53043 4 6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4Z"
            fill="#4B5563"
        />
    </svg>
);

const IconBed = (): ReactElement => (
    <svg width="26" height="19" viewBox="0 0 26 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1.75 0.75C2.44141 0.75 3 1.30859 3 2V12H11.75V5.75C11.75 5.05859 12.3086 4.5 13 4.5H21.75C23.8203 4.5 25.5 6.17969 25.5 8.25V17C25.5 17.6914 24.9414 18.25 24.25 18.25C23.5586 18.25 23 17.6914 23 17V15.75H14.25H13H3V17C3 17.6914 2.44141 18.25 1.75 18.25C1.05859 18.25 0.5 17.6914 0.5 17V2C0.5 1.30859 1.05859 0.75 1.75 0.75ZM7.375 4.5C8.2038 4.5 8.99866 4.82924 9.58471 5.41529C10.1708 6.00134 10.5 6.7962 10.5 7.625C10.5 8.4538 10.1708 9.24866 9.58471 9.83471C8.99866 10.4208 8.2038 10.75 7.375 10.75C6.5462 10.75 5.75134 10.4208 5.16529 9.83471C4.57924 9.24866 4.25 8.4538 4.25 7.625C4.25 6.7962 4.57924 6.00134 5.16529 5.41529C5.75134 4.82924 6.5462 4.5 7.375 4.5Z"
            fill="#0F5A62"
        />
    </svg>
);

const IconCalendar = (): ReactElement => (
    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5.25 0.5C5.94141 0.5 6.5 1.05859 6.5 1.75V3H11.5V1.75C11.5 1.05859 12.0586 0.5 12.75 0.5C13.4414 0.5 14 1.05859 14 1.75V3H15.875C16.9102 3 17.75 3.83984 17.75 4.875V6.75H0.25V4.875C0.25 3.83984 1.08984 3 2.125 3H4V1.75C4 1.05859 4.55859 0.5 5.25 0.5ZM0.25 8H17.75V18.625C17.75 19.6602 16.9102 20.5 15.875 20.5H2.125C1.08984 20.5 0.25 19.6602 0.25 18.625V8ZM2.75 11.125V12.375C2.75 12.7188 3.03125 13 3.375 13H4.625C4.96875 13 5.25 12.7188 5.25 12.375V11.125C5.25 10.7812 4.96875 10.5 4.625 10.5H3.375C3.03125 10.5 2.75 10.7812 2.75 11.125ZM7.75 11.125V12.375C7.75 12.7188 8.03125 13 8.375 13H9.625C9.96875 13 10.25 12.7188 10.25 12.375V11.125C10.25 10.7812 9.96875 10.5 9.625 10.5H8.375C8.03125 10.5 7.75 10.7812 7.75 11.125ZM13.375 10.5C13.0312 10.5 12.75 10.7812 12.75 11.125V12.375C12.75 12.7188 13.0312 13 13.375 13H14.625C14.9688 13 15.25 12.7188 15.25 12.375V11.125C15.25 10.7812 14.9688 10.5 14.625 10.5H13.375ZM2.75 16.125V17.375C2.75 17.7188 3.03125 18 3.375 18H4.625C4.96875 18 5.25 17.7188 5.25 17.375V16.125C5.25 15.7812 4.96875 15.5 4.625 15.5H3.375C3.03125 15.5 2.75 15.7812 2.75 16.125ZM8.375 15.5C8.03125 15.5 7.75 15.7812 7.75 16.125V17.375C7.75 17.7188 8.03125 18 8.375 18H9.625C9.96875 18 10.25 17.7188 10.25 17.375V16.125C10.25 15.7812 9.96875 15.5 9.625 15.5H8.375ZM12.75 16.125V17.375C12.75 17.7188 13.0312 18 13.375 18H14.625C14.9688 18 15.25 17.7188 15.25 17.375V16.125C15.25 15.7812 14.9688 15.5 14.625 15.5H13.375C13.0312 15.5 12.75 15.7812 12.75 16.125Z"
            fill="#0F5A62"
        />
    </svg>
);

const IconDollar = (): ReactElement => (
    <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.00055 0.5C6.69195 0.5 7.25055 1.05859 7.25055 1.75V3.14453C7.31305 3.15234 7.37164 3.16016 7.43414 3.17188C7.44976 3.17578 7.46148 3.17578 7.47711 3.17969L9.35211 3.52344C10.0318 3.64844 10.481 4.30078 10.356 4.97656C10.231 5.65234 9.57867 6.10547 8.90289 5.98047L7.04742 5.64062C5.82476 5.46094 4.74664 5.58203 3.98883 5.88281C3.23101 6.18359 2.92633 6.59766 2.85601 6.98047C2.77789 7.39844 2.83648 7.63281 2.90289 7.77734C2.9732 7.92969 3.11773 8.10156 3.40289 8.29297C4.03961 8.71094 5.01617 8.98438 6.28179 9.32031L6.39508 9.35156C7.51226 9.64844 8.87945 10.0078 9.89508 10.6719C10.4498 11.0352 10.9732 11.5273 11.2974 12.2148C11.6295 12.9141 11.6998 13.6953 11.5474 14.5273C11.2779 16.0117 10.2545 17.0039 8.98492 17.5234C8.44976 17.7422 7.86773 17.8828 7.25055 17.9531V19.25C7.25055 19.9414 6.69195 20.5 6.00055 20.5C5.30914 20.5 4.75054 19.9414 4.75054 19.25V17.8867C4.73492 17.8828 4.71539 17.8828 4.69976 17.8789H4.69195C3.73883 17.7305 2.17242 17.3203 1.11773 16.8516C0.488826 16.5703 0.20367 15.832 0.48492 15.2031C0.76617 14.5742 1.50445 14.2891 2.13336 14.5703C2.94976 14.9336 4.29351 15.293 5.07086 15.4141C6.31695 15.5977 7.3443 15.4922 8.03961 15.207C8.69976 14.9375 9.00054 14.5469 9.08648 14.0781C9.1607 13.6641 9.10211 13.4258 9.0357 13.2812C8.96148 13.125 8.81695 12.9531 8.52789 12.7617C7.88726 12.3438 6.90679 12.0703 5.63726 11.7344L5.52789 11.707C4.41461 11.4102 3.04742 11.0469 2.03179 10.3828C1.47711 10.0195 0.957576 9.52344 0.633357 8.83594C0.305232 8.13672 0.238826 7.35547 0.395076 6.52344C0.676326 5.03125 1.79351 4.0625 3.06304 3.55859C3.58258 3.35156 4.15289 3.21094 4.75054 3.12891V1.75C4.75054 1.05859 5.30914 0.5 6.00055 0.5Z"
            fill="#0F5A62"
        />
    </svg>
);

const IconClock = (): ReactElement => (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 0.5C12.6522 0.5 15.1957 1.55357 17.0711 3.42893C18.9464 5.3043 20 7.84784 20 10.5C20 13.1522 18.9464 15.6957 17.0711 17.5711C15.1957 19.4464 12.6522 20.5 10 20.5C7.34784 20.5 4.8043 19.4464 2.92893 17.5711C1.05357 15.6957 0 13.1522 0 10.5C0 7.84784 1.05357 5.3043 2.92893 3.42893C4.8043 1.55357 7.34784 0.5 10 0.5ZM9.0625 5.1875V10.5C9.0625 10.8125 9.21875 11.1055 9.48047 11.2812L13.2305 13.7812C13.6602 14.0703 14.2422 13.9531 14.5312 13.5195C14.8203 13.0859 14.7031 12.5078 14.2695 12.2188L10.9375 10V5.1875C10.9375 4.66797 10.5195 4.25 10 4.25C9.48047 4.25 9.0625 4.66797 9.0625 5.1875Z"
            fill="#0F5A62"
        />
    </svg>
);

const IconUserProfile = (): ReactElement => (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14.0273 13.757C13.2504 12.407 11.7914 11.5 10.125 11.5H7.875C6.20859 11.5 4.74961 12.407 3.97266 13.757C5.21016 15.1352 7.00313 16 9 16C10.9969 16 12.7898 15.1316 14.0273 13.757ZM0 9.25C0 6.86305 0.948212 4.57387 2.63604 2.88604C4.32387 1.19821 6.61305 0.25 9 0.25C11.3869 0.25 13.6761 1.19821 15.364 2.88604C17.0518 4.57387 18 6.86305 18 9.25C18 11.6369 17.0518 13.9261 15.364 15.614C13.6761 17.3018 11.3869 18.25 9 18.25C6.61305 18.25 4.32387 17.3018 2.63604 15.614C0.948212 13.9261 0 11.6369 0 9.25ZM9 9.8125C9.67133 9.8125 10.3152 9.54582 10.7899 9.07111C11.2646 8.59641 11.5312 7.95258 11.5312 7.28125C11.5312 6.60992 11.2646 5.96609 10.7899 5.49139C10.3152 5.01668 9.67133 4.75 9 4.75C8.32867 4.75 7.68484 5.01668 7.21014 5.49139C6.73543 5.96609 6.46875 6.60992 6.46875 7.28125C6.46875 7.95258 6.73543 8.59641 7.21014 9.07111C7.68484 9.54582 8.32867 9.8125 9 9.8125Z"
            fill="#0F5A62"
        />
    </svg>
);

const IconContact = (): ReactElement => (
    <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M2.375 0.25C1.13398 0.25 0.125 1.25898 0.125 2.5V16C0.125 17.241 1.13398 18.25 2.375 18.25H12.5C13.741 18.25 14.75 17.241 14.75 16V2.5C14.75 1.25898 13.741 0.25 12.5 0.25H2.375ZM6.3125 10.375H8.5625C10.1164 10.375 11.375 11.6336 11.375 13.1875C11.375 13.4969 11.1219 13.75 10.8125 13.75H4.0625C3.75312 13.75 3.5 13.4969 3.5 13.1875C3.5 11.6336 4.75859 10.375 6.3125 10.375ZM5.1875 7C5.1875 6.40326 5.42455 5.83097 5.84651 5.40901C6.26847 4.98705 6.84076 4.75 7.4375 4.75C8.03424 4.75 8.60653 4.98705 9.02849 5.40901C9.45045 5.83097 9.6875 6.40326 9.6875 7C9.6875 7.59674 9.45045 8.16903 9.02849 8.59099C8.60653 9.01295 8.03424 9.25 7.4375 9.25C6.84076 9.25 6.26847 9.01295 5.84651 8.59099C5.42455 8.16903 5.1875 7.59674 5.1875 7ZM17 3.0625C17 2.75312 16.7469 2.5 16.4375 2.5C16.1281 2.5 15.875 2.75312 15.875 3.0625V5.3125C15.875 5.62187 16.1281 5.875 16.4375 5.875C16.7469 5.875 17 5.62187 17 5.3125V3.0625ZM16.4375 7C16.1281 7 15.875 7.25313 15.875 7.5625V9.8125C15.875 10.1219 16.1281 10.375 16.4375 10.375C16.7469 10.375 17 10.1219 17 9.8125V7.5625C17 7.25313 16.7469 7 16.4375 7ZM17 12.0625C17 11.7531 16.7469 11.5 16.4375 11.5C16.1281 11.5 15.875 11.7531 15.875 12.0625V14.3125C15.875 14.6219 16.1281 14.875 16.4375 14.875C16.7469 14.875 17 14.6219 17 14.3125V12.0625Z"
            fill="#0F5A62"
        />
    </svg>
);
const IconEdit = (): ReactElement => (
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.8953 0.843652C12.2965 0.244824 11.3285 0.244824 10.7297 0.843652L9.90664 1.66396L12.5836 4.34092L13.4066 3.51787C14.0055 2.91904 14.0055 1.95107 13.4066 1.35225L12.8953 0.843652ZM4.71406 6.85928C4.54727 7.02607 4.41875 7.23115 4.34492 7.45811L3.53555 9.88623C3.45625 10.1214 3.51914 10.3812 3.69414 10.5589C3.86914 10.7366 4.12891 10.7968 4.3668 10.7175L6.79492 9.90811C7.01914 9.83428 7.22422 9.70576 7.39375 9.53897L11.9684 4.96162L9.28867 2.28193L4.71406 6.85928ZM2.625 2.00029C1.17578 2.00029 0 3.17607 0 4.62529V11.6253C0 13.0745 1.17578 14.2503 2.625 14.2503H9.625C11.0742 14.2503 12.25 13.0745 12.25 11.6253V9.00029C12.25 8.51631 11.859 8.12529 11.375 8.12529C10.891 8.12529 10.5 8.51631 10.5 9.00029V11.6253C10.5 12.1093 10.109 12.5003 9.625 12.5003H2.625C2.14102 12.5003 1.75 12.1093 1.75 11.6253V4.62529C1.75 4.14131 2.14102 3.75029 2.625 3.75029H5.25C5.73398 3.75029 6.125 3.35928 6.125 2.87529C6.125 2.39131 5.73398 2.00029 5.25 2.00029H2.625Z"
            fill="#0F5A62"
        />
    </svg>
);

const IconIdentityCard = (): ReactElement => (
    <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 2.625H20.25C20.25 1.38398 19.241 0.375 18 0.375H2.25C1.00898 0.375 0 1.38398 0 2.625ZM0 3.75V13.875C0 15.116 1.00898 16.125 2.25 16.125H18C19.241 16.125 20.25 15.116 20.25 13.875V3.75H0ZM2.25 13.4988C2.25 12.4617 3.09023 11.625 4.12383 11.625H8.25117C9.28828 11.625 10.125 12.4652 10.125 13.4988C10.125 13.7062 9.95625 13.875 9.74883 13.875H2.62617C2.41875 13.875 2.25 13.7062 2.25 13.4988ZM6.1875 6C6.78424 6 7.35653 6.23705 7.77849 6.65901C8.20045 7.08097 8.4375 7.65326 8.4375 8.25C8.4375 8.84674 8.20045 9.41903 7.77849 9.84099C7.35653 10.2629 6.78424 10.5 6.1875 10.5C5.59076 10.5 5.01847 10.2629 4.59651 9.84099C4.17455 9.41903 3.9375 8.84674 3.9375 8.25C3.9375 7.65326 4.17455 7.08097 4.59651 6.65901C5.01847 6.23705 5.59076 6 6.1875 6ZM12.375 6.5625C12.375 6.25313 12.6281 6 12.9375 6H17.4375C17.7469 6 18 6.25313 18 6.5625C18 6.87187 17.7469 7.125 17.4375 7.125H12.9375C12.6281 7.125 12.375 6.87187 12.375 6.5625ZM12.375 8.8125C12.375 8.50313 12.6281 8.25 12.9375 8.25H17.4375C17.7469 8.25 18 8.50313 18 8.8125C18 9.12187 17.7469 9.375 17.4375 9.375H12.9375C12.6281 9.375 12.375 9.12187 12.375 8.8125ZM12.375 11.0625C12.375 10.7531 12.6281 10.5 12.9375 10.5H17.4375C17.7469 10.5 18 10.7531 18 11.0625C18 11.3719 17.7469 11.625 17.4375 11.625H12.9375C12.6281 11.625 12.375 11.3719 12.375 11.0625Z"
            fill="#0F5A62"
        />
    </svg>
);

const IconCrown = (): ReactElement => (
    <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10.8633 2.97656C11.2641 2.73047 11.5312 2.28398 11.5312 1.78125C11.5312 1.0043 10.902 0.375 10.125 0.375C9.34805 0.375 8.71875 1.0043 8.71875 1.78125C8.71875 2.2875 8.98594 2.73047 9.38672 2.97656L7.37227 7.00547C7.05234 7.64531 6.22266 7.82812 5.66367 7.38164L2.53125 4.875C2.70703 4.63945 2.8125 4.34766 2.8125 4.03125C2.8125 3.2543 2.1832 2.625 1.40625 2.625C0.629297 2.625 0 3.2543 0 4.03125C0 4.8082 0.629297 5.4375 1.40625 5.4375C1.41328 5.4375 1.42383 5.4375 1.43086 5.4375L3.0375 14.2758C3.23086 15.3445 4.1625 16.125 5.25234 16.125H14.9977C16.084 16.125 17.0156 15.348 17.2125 14.2758L18.8191 5.4375C18.8262 5.4375 18.8367 5.4375 18.8438 5.4375C19.6207 5.4375 20.25 4.8082 20.25 4.03125C20.25 3.2543 19.6207 2.625 18.8438 2.625C18.0668 2.625 17.4375 3.2543 17.4375 4.03125C17.4375 4.34766 17.543 4.63945 17.7188 4.875L14.5863 7.38164C14.0273 7.82812 13.1977 7.64531 12.8777 7.00547L10.8633 2.97656Z"
            fill="#0F5A62"
        />
    </svg>
);

const IconSearch = (): ReactElement => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M7 0C3.14062 0 0 3.14062 0 7C0 10.8594 3.14062 14 7 14C8.64062 14 10.1562 13.4219 11.3594 12.4375L14.2812 15.3594C14.5156 15.5938 14.8281 15.7188 15.1406 15.7188C15.4531 15.7188 15.7656 15.5938 16 15.3594C16.4688 14.8906 16.4688 14.1406 16 13.6719L13.0781 10.75C14.0625 9.54688 14.6406 8.03125 14.6406 6.39062C14.6406 2.53125 11.5 0 7.64062 0H7ZM7 2C9.76562 2 12 4.23438 12 7C12 9.76562 9.76562 12 7 12C4.23438 12 2 9.76562 2 7C2 4.23438 4.23438 2 7 2Z"
            fill="#4B5563"
        />
    </svg>
);

const IconCalendarSmall = (): ReactElement => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4 0C4.55312 0 5 0.446875 5 1V2H11V1C11 0.446875 11.4469 0 12 0C12.5531 0 13 0.446875 13 1V2H14.5C15.3281 2 16 2.67188 16 3.5V5H0V3.5C0 2.67188 0.671875 2 1.5 2H3V1C3 0.446875 3.44688 0 4 0ZM0 6H16V14.5C16 15.3281 15.3281 16 14.5 16H1.5C0.671875 16 0 15.3281 0 14.5V6Z"
            fill="#4B5563"
        />
    </svg>
);

const IconEye = (): ReactElement => (
    <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.28047 0C6.75547 0 4.73359 1.15 3.26172 2.51875C1.79922 3.875 0.821094 5.5 0.358594 6.61562C0.255469 6.8625 0.255469 7.1375 0.358594 7.38437C0.821094 8.5 1.79922 10.125 3.26172 11.4812C4.73359 12.85 6.75547 14 9.28047 14C11.8055 14 13.8273 12.85 15.2992 11.4812C16.7617 10.1219 17.7398 8.5 18.2055 7.38437C18.3086 7.1375 18.3086 6.8625 18.2055 6.61562C17.7398 5.5 16.7617 3.875 15.2992 2.51875C13.8273 1.15 11.8055 0 9.28047 0ZM4.78047 7C4.78047 5.80653 5.25457 4.66193 6.09849 3.81802C6.9424 2.97411 8.08699 2.5 9.28047 2.5C10.4739 2.5 11.6185 2.97411 12.4624 3.81802C13.3064 4.66193 13.7805 5.80653 13.7805 7C13.7805 8.19347 13.3064 9.33807 12.4624 10.182C11.6185 11.0259 10.4739 11.5 9.28047 11.5C8.08699 11.5 6.9424 11.0259 6.09849 10.182C5.25457 9.33807 4.78047 8.19347 4.78047 7ZM9.28047 5C9.28047 6.10313 8.38359 7 7.28047 7C7.05859 7 6.84609 6.9625 6.64609 6.89687C6.47422 6.84062 6.27422 6.94688 6.28047 7.12813C6.28984 7.34375 6.32109 7.55937 6.38047 7.775C6.80859 9.375 8.45547 10.325 10.0555 9.89688C11.6555 9.46875 12.6055 7.82188 12.1773 6.22188C11.8305 4.925 10.6836 4.05312 9.40859 4C9.22734 3.99375 9.12109 4.19062 9.17734 4.36562C9.24297 4.56562 9.28047 4.77812 9.28047 5Z" fill="#0F5A62" />
    </svg>

);

const IconDownload = (): ReactElement => (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.28125 1C9.28125 0.446875 8.83438 0 8.28125 0C7.72813 0 7.28125 0.446875 7.28125 1V8.58438L4.9875 6.29063C4.59688 5.9 3.9625 5.9 3.57188 6.29063C3.18125 6.68125 3.18125 7.31563 3.57188 7.70625L7.57188 11.7063C7.9625 12.0969 8.59688 12.0969 8.9875 11.7063L12.9875 7.70625C13.3781 7.31563 13.3781 6.68125 12.9875 6.29063C12.5969 5.9 11.9625 5.9 11.5719 6.29063L9.28125 8.58438V1ZM2.28125 11C1.17813 11 0.28125 11.8969 0.28125 13V14C0.28125 15.1031 1.17813 16 2.28125 16H14.2812C15.3844 16 16.2812 15.1031 16.2812 14V13C16.2812 11.8969 15.3844 11 14.2812 11H11.1094L9.69375 12.4156C8.9125 13.1969 7.64687 13.1969 6.86562 12.4156L5.45312 11H2.28125ZM13.7812 12.75C13.9802 12.75 14.1709 12.829 14.3116 12.9697C14.4522 13.1103 14.5312 13.3011 14.5312 13.5C14.5312 13.6989 14.4522 13.8897 14.3116 14.0303C14.1709 14.171 13.9802 14.25 13.7812 14.25C13.5823 14.25 13.3916 14.171 13.2509 14.0303C13.1103 13.8897 13.0312 13.6989 13.0312 13.5C13.0312 13.3011 13.1103 13.1103 13.2509 12.9697C13.3916 12.829 13.5823 12.75 13.7812 12.75Z" fill="#0F5A62" />
    </svg>

);
const IconStar = ({ filled }: { filled: boolean }): ReactElement => (
    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M7.05292 0.926C7.37341 0.109 8.62341 0.109 8.9439 0.926L10.2579 4.256L13.7929 4.524C14.6789 4.592 15.0374 5.73 14.3794 6.304L11.6714 8.688L12.4874 12.144C12.6899 13.01 11.7784 13.69 11.0154 13.24L8.00041 11.448L4.98541 13.24C4.22241 13.69 3.31091 13.01 3.51341 12.144L4.32941 8.688L1.62141 6.304C0.963409 5.73 1.32191 4.592 2.20791 4.524L5.74291 4.256L7.05292 0.926Z"
            fill={filled ? '#F59E0B' : '#E5E7EB'}
        />
    </svg>
);

export default function GuestProfilePage(): ReactElement {
    const navigate = useNavigate();
    const { guestId } = useParams<{ guestId: string }>();
    const location = useLocation();
    const locationState = location.state as GuestProfileState | undefined;
    const routeGuest = locationState?.guest;
    const [activeTab, setActiveTab] = useState<TabKey>('profile');

    const selectedGuest = useMemo(() => {
        if (routeGuest) {
            return routeGuest;
        }

        const id = Number(guestId);
        if (Number.isNaN(id)) {
            return undefined;
        }

        return guestData.find((guest) => guest.id === id);
    }, [guestId, routeGuest]);

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }

        navigate('/guests/guest-database', { replace: true });
    };

    if (!selectedGuest) {
        return (
            <div className="p-6 min-h-[calc(100vh-64px)] text-[#111827] space-y-6">
                <button
                    onClick={handleBack}
                    className="inline-flex items-center text-sm font-medium text-[#0F5A62] hover:text-teal-700"
                >
                    &larr; Back to guests
                </button>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-[#111827] mb-2">Guest not found</h2>
                    <p className="text-sm text-[#6B7280]">
                        We couldn't find details for this guest. Try returning to the database and selecting another guest.
                    </p>
                </div>
            </div>
        );
    }

    const {
        name,
        email,
        phone,
        avatar,
        totalStays,
        totalNights,
        totalSpending,
        lastStayDays,
        loyaltyPoints,
        // companyName,
        guestCode,
        dateOfBirth,
        nationality,
        address,
        emergencyContact,
        preferredLanguages,
        identification,
        stayHistory = [],
        preferences = [],
        reviews = [],
        reviewSummary,
    } = selectedGuest;

    const [staySearch, setStaySearch] = useState('');
    const [stayStatusFilter, setStayStatusFilter] = useState<'All Status' | GuestStayStatus>('All Status');
    const [staySourceFilter, setStaySourceFilter] = useState<'All Sources' | string>('All Sources');
    const [stayStartDate, setStayStartDate] = useState('');
    const [stayEndDate, setStayEndDate] = useState('');

    const staySources = useMemo(() => {
        return Array.from(new Set(stayHistory.map((stay) => stay.bookingSource)));
    }, [stayHistory]);

    const filteredStayHistory = useMemo(() => {
        return stayHistory.filter((stay) => {
            if (staySearch) {
                const query = staySearch.toLowerCase();
                const haystack = `${stay.roomType} ${stay.bookingSource}`.toLowerCase();
                if (!haystack.includes(query)) {
                    return false;
                }
            }

            if (stayStatusFilter !== 'All Status' && stay.status !== stayStatusFilter) {
                return false;
            }

            if (staySourceFilter !== 'All Sources' && stay.bookingSource !== staySourceFilter) {
                return false;
            }

            const stayStart = new Date(stay.checkIn).getTime();
            const stayEnd = new Date(stay.checkOut).getTime();

            if (stayStartDate) {
                const filterStart = new Date(stayStartDate).getTime();
                if (!Number.isNaN(filterStart) && stayStart < filterStart) {
                    return false;
                }
            }

            if (stayEndDate) {
                const filterEnd = new Date(stayEndDate).getTime();
                if (!Number.isNaN(filterEnd) && stayEnd > filterEnd) {
                    return false;
                }
            }

            return true;
        });
    }, [stayHistory, staySearch, stayStatusFilter, staySourceFilter, stayStartDate, stayEndDate]);

    const personalInformation = [
        { label: 'Full Name', value: name },
        { label: 'Email Address', value: email },
        { label: 'Phone Number', value: phone },
        { label: 'Date of Birth', value: formatDate(dateOfBirth) },
        { label: 'Nationality', value: nationality ?? '-' },
    ];

    const contactInformation = [
        { label: 'Home Address', value: address ?? '-' },
        {
            label: 'Emergency Contact',
            value: emergencyContact
                ? `${emergencyContact.name}${emergencyContact.relationship ? ` (${emergencyContact.relationship})` : ''}`
                : '-',
        },
        {
            label: 'Emergency Phone',
            value: emergencyContact?.phone ?? '-',
        },
        {
            label: 'Preferred Language',
            value: formatList(preferredLanguages),
        },
    ];

    const guestStatus = [
        { label: 'Total Stays', value: typeof totalStays === 'number' ? totalStays.toLocaleString('en-US') : '-' },
        { label: 'Total Nights', value: typeof totalNights === 'number' ? totalNights.toLocaleString('en-US') : '-' },
        { label: 'Loyalty Points', value: typeof loyaltyPoints === 'number' ? loyaltyPoints.toLocaleString('en-US') : '-' },
    ];

    const identificationInfo = [
        { label: 'ID Type', value: identification?.type ?? '-' },
        { label: 'ID Number', value: identification?.number ?? '-' },
        { label: 'Expiry Date', value: identification ? formatDate(identification.expiryDate) : '-' },
    ];

    const guestIdentifier = guestCode ?? `GT-${String(selectedGuest.id).padStart(3, '0')}`;

    const headerDetails = [
        { icon: <IconEmail />, value: email },
        { icon: <IconPhone />, value: phone },
        { icon: <IconMapPin />, value: address },
    ].filter((detail) => Boolean(detail.value));

    const statusStyles: Record<GuestStayStatus, string> = {
        Completed: 'bg-[#0F5A62] text-white',
        Upcoming: 'bg-[#0E57B7] text-white',
        Cancelled: 'bg-[#710000] text-white',
    };

    const renderRatingStars = (rating: number): ReactElement => {
        const rounded = Math.round(rating);
        return (
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <IconStar key={index} filled={index < rounded} />
                ))}
            </div>
        );
    };

    const renderPreferenceSection = (section: GuestPreferenceSection): ReactElement => (
        <div key={section.title} className="rounded-[8px] border border-gray-200 bg-white p-6">
            <h3 className="text-[18px] text-[#111827]">{section.title}</h3>
            <dl className="mt-4 space-y-4 text-[16px] text-[#4B5563]">
                {section.items.map((item) => (
                    <div key={item.question} className="flex flex-col">
                        <dt className="text-[16px] text-[#111827]">{item.question}</dt>
                        <dd className="text-[16px] text-[#4B5563] whitespace-pre-line">{item.answer}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );

    const renderReviewSummary = (summary: GuestReviewSummary | undefined): ReactElement | null => {
        if (!summary) {
            return null;
        }

        return (
            <div className="grid gap-4 rounded-[8px] border border-gray-200 bg-white p-6 md:grid-cols-3">
                <div className="flex flex-col items-start justify-center gap-2">
                    <span className="text-sm font-medium text-[#6B7280]">Average Rating</span>
                    <div className="flex items-center gap-3">
                        <span className="text-4xl font-semibold text-[#111827]">{summary.averageRating.toFixed(1)}</span>
                        {renderRatingStars(summary.averageRating)}
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-2">
                    <span className="text-sm font-medium text-[#6B7280]">Total Reviews</span>
                    <span className="text-3xl font-semibold text-[#111827]">{summary.totalReviews}</span>
                </div>
                <div className="space-y-2">
                    {summary.distribution.map((item) => {
                        const percentage = summary.totalReviews > 0 ? (item.value / summary.totalReviews) * 100 : 0;
                        return (
                            <div key={item.label} className="flex items-center gap-3 text-sm text-[#4B5563]">
                                <span className="w-6 text-right font-medium text-[#0F5A62]">{item.label}</span>
                                <div className="h-2 w-full rounded-full bg-[#E5E7EB]">
                                    <div className="h-full rounded-full bg-[#0F5A62]" style={{ width: `${percentage}%` }} />
                                </div>
                                <span className="w-6 text-right">{item.value}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderReviewCard = (review: GuestReview): ReactElement => (
        <article key={review.id} className="rounded-[8px] border border-gray-200 bg-white p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm font-medium text-[#0F5A62]">{review.stayDates}</p>
                    <p className="text-xs text-[#6B7280]">{review.roomType}</p>
                </div>
                <p className="text-xs text-[#6B7280]">Posted: {formatDate(review.postedAt)}</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
                {renderRatingStars(review.rating)}
                <span className="text-sm font-semibold text-[#111827]">{review.rating.toFixed(1)}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#4B5563]">{review.comment}</p>
        </article>
    );
    const renderTabContent = (): ReactElement => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <h3 className="text-lg font-semibold text-[#111827]">Guest Profile</h3>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 self-start rounded-[8px] px-4 py-2 text-[14px] font-medium text-[#0F5A62] bg-[#0F5A621A] transition-colors hover:bg-[#0F5A622A]"
                            >
                                <IconEdit />
                                Update Profile
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="rounded-[8px] border border-gray-200 bg-white p-6">
                                <h3 className="flex items-center gap-2 text-[18px] font-semibold text-[#111827]">
                                    <span className="inline-flex items-center justify-center">
                                        <IconUserProfile />
                                    </span>
                                    Personal Information
                                </h3>
                                <dl className="mt-4 space-y-3 text-[14px] text-[#4B5563]">
                                    {personalInformation.map((item) => (
                                        <div key={item.label} className="flex flex-col">
                                            <dt className="text-[14px] font-medium text-[#6B7280]">{item.label}</dt>
                                            <dd className="text-[16px] text-[#111827]">{item.value ?? '-'}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            <div className="rounded-[8px] border border-gray-200 bg-white p-6">
                                <h3 className="flex items-center gap-2 text-[18px] font-semibold text-[#111827]">
                                    <span className="inline-flex items-center justify-center">
                                        <IconContact />
                                    </span>
                                    Contact & Address
                                </h3>
                                <dl className="mt-4 space-y-3 text-[14px] text-[#4B5563]">
                                    {contactInformation.map((item) => (
                                        <div key={item.label} className="flex flex-col">
                                            <dt className="text-[14px] font-medium text-[#6B7280]">{item.label}</dt>
                                            <dd className="text-[16px] text-[#111827]">{item.value ?? '-'}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            <div className="rounded-[8px] border border-gray-200 bg-white p-6">
                                <h3 className="flex items-center gap-2 text-[18px] font-semibold text-[#111827]">
                                    <span className="inline-flex items-center justify-center">
                                        <IconCrown />
                                    </span>
                                    Guest Status
                                </h3>
                                <dl className="mt-4 space-y-3 text-[14px] text-[#4B5563]">
                                    {guestStatus.map((item) => (
                                        <div key={item.label} className="flex flex-col">
                                            <dt className="text-[14px] font-medium text-[#6B7280]">{item.label}</dt>
                                            <dd className="text-[16px] font-semibold text-[#111827]">{item.value ?? '-'}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            <div className="rounded-[8px] border border-gray-200 bg-white p-6">
                                <h3 className="flex items-center gap-2 text-[18px] font-semibold text-[#111827]">
                                    <span className="inline-flex items-center justify-center">
                                        <IconIdentityCard />
                                    </span>
                                    Identification
                                </h3>
                                <dl className="mt-4 space-y-3 text-[14px] text-[#4B5563]">
                                    {identificationInfo.map((item) => (
                                        <div key={item.label} className="flex flex-col">
                                            <dt className="text-[14px] font-medium text-[#6B7280]">{item.label}</dt>
                                            <dd className="text-[16px] text-[#111827]">{item.value ?? '-'}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                );
            case 'stay-history':
                return (
                    <div className="space-y-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <h3 className="text-lg font-semibold text-[#111827]">Guest Stay History</h3>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 self-start rounded-[8px] px-4 py-2 text-[14px] font-medium text-[#0F5A62] bg-[#0F5A621A] transition-colors hover:bg-[#0F5A622A]"
                            >
                                <IconEdit />
                                Update Stay History
                            </button>
                        </div>

                        <div className="flex flex-col gap-4 rounded-[8px] border border-gray-200 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex-1">
                                <label className="sr-only" htmlFor="stay-search">Search stays</label>
                                <div className="flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2">
                                    <IconSearch />
                                    <input
                                        id="stay-search"
                                        type="text"
                                        placeholder="Search stays..."
                                        value={staySearch}
                                        onChange={(event) => setStaySearch(event.target.value)}
                                        className="ml-2 w-full border-0 bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                <div>
                                    <label className="sr-only" htmlFor="stay-status">Status</label>
                                    <select
                                        id="stay-status"
                                        value={stayStatusFilter}
                                        onChange={(event) => setStayStatusFilter(event.target.value as typeof stayStatusFilter)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#111827] focus:outline-none"
                                    >
                                        <option value="All Status">All Status</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="sr-only" htmlFor="stay-source">Sources</label>
                                    <select
                                        id="stay-source"
                                        value={staySourceFilter}
                                        onChange={(event) => setStaySourceFilter(event.target.value as typeof staySourceFilter)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#111827] focus:outline-none"
                                    >
                                        <option value="All Sources">All Sources</option>
                                        {staySources.map((source) => (
                                            <option key={source} value={source}>
                                                {source}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="sr-only" htmlFor="stay-start">Start date</label>
                                    <div className="flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2">
                                        <IconCalendarSmall />
                                        <input
                                            id="stay-start"
                                            type="date"
                                            value={stayStartDate}
                                            onChange={(event) => setStayStartDate(event.target.value)}
                                            className="ml-2 w-full border-0 bg-transparent text-sm text-[#111827] focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="sr-only" htmlFor="stay-end">End date</label>
                                    <div className="flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2">
                                        <IconCalendarSmall />
                                        <input
                                            id="stay-end"
                                            type="date"
                                            value={stayEndDate}
                                            onChange={(event) => setStayEndDate(event.target.value)}
                                            className="ml-2 w-full border-0 bg-transparent text-sm text-[#111827] focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-[8px] border border-gray-200 bg-white">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-[#F9FAFB] text-[#6B7280]">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium">Check-in Date</th>
                                        <th className="px-4 py-3 text-left font-medium">Check-out Date</th>
                                        <th className="px-4 py-3 text-left font-medium">Room Type</th>
                                        <th className="px-4 py-3 text-left font-medium">Booking Source</th>
                                        <th className="px-4 py-3 text-right font-medium">Total Spend</th>
                                        <th className="px-4 py-3 text-left font-medium">Status</th>
                                        <th className="px-4 py-3 text-center font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-[#111827]">
                                    {filteredStayHistory.map((stay) => (
                                        <tr key={stay.id} className="hover:bg-[#F9FAFB]">
                                            <td className="px-4 py-3">{formatDateShort(stay.checkIn)}</td>
                                            <td className="px-4 py-3">{formatDateShort(stay.checkOut)}</td>
                                            <td className="px-4 py-3">{stay.roomType}</td>
                                            <td className="px-4 py-3">{stay.bookingSource}</td>
                                            <td className="px-4 py-3 text-right">{currencyFormatter.format(stay.totalSpend)}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[stay.status]}`}>
                                                    {stay.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button type="button" className="p-1" aria-label="View stay">
                                                        <IconEye />
                                                    </button>
                                                    <button type="button" className="p-1" aria-label="Download stay receipt">
                                                        <IconDownload />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredStayHistory.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-6 text-center text-sm text-[#6B7280]">
                                                No stay records match the current filters.
                                            </td>
                                        </tr>
                                    ) : null}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col gap-4 text-sm text-[#6B7280] md:flex-row md:items-center md:justify-between">
                            <p>
                                Showing 1 to {filteredStayHistory.length} of {stayHistory.length} results
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-[#0F5A62]" type="button">
                                    &lt;
                                </button>
                                <button className="h-8 w-8 rounded bg-[#0F5A62] text-sm font-semibold text-white" type="button">
                                    1
                                </button>
                                <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-[#0F5A62]" type="button">
                                    2
                                </button>
                                <span className="px-1">...</span>
                                <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-[#0F5A62]" type="button">
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'preferences':
                return (
                    <div className="space-y-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <h3 className="text-lg font-semibold text-[#111827]">Guest Preferences</h3>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 self-start rounded-[8px] px-4 py-2 text-[14px] font-medium text-[#0F5A62] bg-[#0F5A621A] transition-colors hover:bg-[#0F5A622A]"
                            >
                                <IconEdit />
                                Update Preferences
                            </button>
                        </div>
                        {preferences.length > 0 ? (
                            <div className="space-y-4">
                                {preferences.map((section) => renderPreferenceSection(section))}
                            </div>
                        ) : (
                            <div className="rounded-[8px] border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-[#4B5563]">
                                Preferences are not available for this guest yet.
                            </div>
                        )}
                    </div>
                );
            case 'reviews':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-[#111827]">Guest Reviews</h3>
                        {renderReviewSummary(reviewSummary)}

                        <div className="flex flex-col gap-3 rounded-[8px] border border-gray-200 bg-white p-4 md:flex-row md:items-center">
                            <label className="sr-only" htmlFor="review-sort">Sort reviews</label>
                            <select id="review-sort" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#111827] focus:outline-none md:w-auto">
                                <option>Sort by: Newest</option>
                                <option>Sort by: Oldest</option>
                                <option>Sort by: Highest Rating</option>
                                <option>Sort by: Lowest Rating</option>
                            </select>
                            <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#111827] focus:outline-none md:w-auto">
                                <option>All Periods</option>
                                <option>Past 30 days</option>
                                <option>Past 6 months</option>
                                <option>Past year</option>
                            </select>
                            <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#111827] focus:outline-none md:w-auto">
                                <option>All Review Types</option>
                                <option>Business</option>
                                <option>Leisure</option>
                                <option>Family</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            {reviews.length > 0 ? reviews.map((review) => renderReviewCard(review)) : (
                                <div className="rounded-[8px] border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-[#4B5563]">
                                    No reviews available for this guest yet.
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-4 text-sm text-[#6B7280] md:flex-row md:items-center md:justify-between">
                            <p>
                                Showing 1 to {reviews.length > 0 ? Math.min(reviews.length, 3) : 0} of {reviews.length} results
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-[#0F5A62]" type="button">
                                    &lt;
                                </button>
                                <button className="h-8 w-8 rounded bg-[#0F5A62] text-sm font-semibold text-white" type="button">
                                    1
                                </button>
                                <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-[#0F5A62]" type="button">
                                    2
                                </button>
                                <span className="px-1">...</span>
                                <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-[#0F5A62]" type="button">
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <></>;
        }
    };

    const summaryCards = [
        {
            key: 'stays',
            label: 'Total Stays',
            value: typeof totalStays === 'number' ? totalStays.toLocaleString('en-US') : '-',
            helper: 'Stays',
            icon: <IconBed />,
        },
        {
            key: 'nights',
            label: 'Total Nights',
            value: typeof totalNights === 'number' ? totalNights.toLocaleString('en-US') : '-',
            helper: 'Nights',
            icon: <IconCalendar />,
        },
        {
            key: 'spending',
            label: 'Total Spending',
            value: currencyFormatter.format(totalSpending ?? 0),
            helper: 'Revenue',
            icon: <IconDollar />,
        },
        {
            key: 'last-stay',
            label: 'Last Stay',
            value: typeof lastStayDays === 'number' ? lastStayDays.toLocaleString('en-US') : '-',
            helper: 'Days ago',
            icon: <IconClock />,
        },
    ];

    return (
        <div className="p-6 min-h-[calc(100vh-64px)] text-[#111827] space-y-6">
            <section className="rounded-[8px] border border-gray-200 bg-white p-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-top md:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F5A62] text-2xl font-semibold text-white">
                            {avatar}
                        </div>
                        <div className="space-y-3">
                            <div>
                                <h1 className="text-2xl font-semibold text-[#111827]">{name}</h1>
                                {/* {companyName && <p className="text-sm text-[#4B5563]">{companyName}</p>} */}
                            </div>
                            {headerDetails.length > 0 ? (
                                <ul className="space-y-2 text-sm text-[#4B5563]">
                                    {headerDetails.map((detail) => (
                                        <li key={detail.value} className="flex items-center gap-2">
                                            <span className="flex h-6 w-6 items-center justify-center">
                                                {detail.icon}
                                            </span>
                                            <span>{detail.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    </div>

                    <div className="text-right text-[14px]">
                        <p className="text-[#6B7280]">Guest ID</p>
                        <p className="text-[18px] font-semibold text-[#111827]">#{guestIdentifier}</p>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((card) => (
                    <div key={card.key} className="flex items-center justify-between gap-4 rounded-[8px] border border-gray-200 bg-white p-4">
                        <div>
                            <p className="text-[14px] font-medium text-[#6B7280]">{card.label}</p>
                            <p className="text-[30px] font-semibold text-[#111827]">{card.value}</p>
                            <p className="text-[14px] tracking-wide text-[#9CA3AF]">{card.helper}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#E0F2FE]">
                            {card.icon}
                        </div>
                    </div>
                ))}
            </section>

            <section className="rounded-[8px] border border-gray-200 bg-white p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <nav className="flex flex-wrap gap-4 text-[16px] font-medium text-[#6B7280]">
                        {TAB_ITEMS.map((tab) => {
                            const isActive = tab.key === activeTab;
                            return (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`relative pb-2 transition-colors px-[36px] ${isActive ? 'text-[#0F5A62]' : 'hover:text-[#0F5A62]'}`}
                                >
                                    {tab.label}
                                    {isActive ? (
                                        <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#0F5A62]" />
                                    ) : null}
                                </button>
                            );
                        })}
                    </nav>
                </div>
                <div className="mt-6">{renderTabContent()}</div>
            </section>
        </div>
    );
}
