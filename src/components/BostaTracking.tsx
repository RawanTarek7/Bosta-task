import React, {useState, useEffect} from 'react';

interface BostaTrackingProps {
    trackingNumber: string;
    language: 'ar' | 'en';
}

interface Data {
    [key: string]: string;
}

const BostaTracking: React.FC<BostaTrackingProps> = ({trackingNumber, language}) => {
    const [data, setData] = useState<Data | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);




    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://tracking.bosta.co/shipments/track/${trackingNumber}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                // @ts-ignore
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [trackingNumber]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>An error occurred: {error.message}</p>;
    }

    if (!data) {
        return <p>No data found</p>;
    }

    const arabicMap: Data = {
        'Status': 'الحالة',
        'Delivered': 'تم التوصيل',
        'In transit': 'في الطريق',
        'Failed Delivery': 'فشل التوصيل',
    };

    const englishMap: Data = {
        'الحالة': 'Status',
        'تم التوصيل': 'Delivered',
        'في الطريق': 'In transit',
        'فشل التوصيل': 'Failed Delivery',
    };

    const map: Data = language === 'ar' ? arabicMap : englishMap;

    const mappedData: Data = Object.entries(data).reduce((acc, [key, value]) => {
        if (map[key]) {
            // @ts-ignore
            acc[map[key]] = value;
        } else {
            // @ts-ignore
            acc[key] = value;
        }

        return acc;
    }, {});

    return (
        <pre>
      {JSON.stringify(mappedData, null, 2)}
    </pre>
    );
};

export default BostaTracking;
