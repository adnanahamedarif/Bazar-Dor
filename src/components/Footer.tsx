import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-sm text-gray-900 md:flex-row md:text-left">
                <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
                <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
            </div>
        </footer>
    );
};

export default Footer;