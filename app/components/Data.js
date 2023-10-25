//일단 Context활용하기 전에 임시로 데이터 불러올때 쓰세요!(복사 붙여넣기)

const [data, setData] = useState();
const [loading, setLoading] = useState(true);

async function getData() {
    const result = await axios.get('/api');
    const newData = result.data.items
    setData(newData);
    setLoading(false);
}

useEffect(() => {
    getData();
}, [])

if (loading) {
    return <div>로딩 중...</div>;
}


