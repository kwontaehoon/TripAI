'use client';

import { loadingModalAtom } from '@/store/ai';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';

export default function LoadingModal() {
    const [loadingModal] = useAtom(loadingModalAtom)
    if (!loadingModal.isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            data-oid="i3my_3_"
        >
            <div
                className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center"
                data-oid="y94j_fc"
            >
                <div className="flex justify-center mb-4" data-oid="c4--db3">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" data-oid="j-wcrf." />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2" data-oid="nnfcuhg">
                    잠시만 기다려주세요
                </h3>
                <p className="text-gray-600" data-oid="lca454f">
                    {loadingModal.message}
                </p>
            </div>
        </div>
    );
}
