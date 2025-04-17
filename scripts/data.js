// data.js - 資料模型與假資料
const data = {
  plants: [
    {
      id: 'a1',
      label: 'ASEKH A1A2',
      img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60',
      areas: ['k1', 'k3', 'k5', 'k7'],
    },
    {
      id: 'a3',
      label: 'ASEKH A3',
      img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60',
      areas: ['k11', 'k18', 'k21', 'k22', 'k25'],
    },
  ],
  areas: {
    k1: {
      label: 'K1 1F',
      img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=60',
      machines: [...Array(10)].map((_, i) => i + 1),
    },
    k3: {
      label: 'K3 2F',
      img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60',
      machines: [...Array(10)].map((_, i) => i + 1),
    },
    k5: {
      label: 'K5 2F',
      img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=60',
      machines: [...Array(10)].map((_, i) => i + 1),
    },
    k7: {
      label: 'K7',
      img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60',
      machines: [...Array(10)].map((_, i) => i + 1),
    },
    k11: {
      label: 'K11',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60',
      machines: [...Array(10)].map((_, i) => i + 1),
    },
    k18: {
      label: 'K18',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60',
      machines: [...Array(10)].map((_, i) => i + 1),
    },
    k21: {
      label: 'K21',
      img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=60',
      machines: [...Array(10)].map((_, i) => i + 1),
    },
    k22: {
      label: 'K22',
      img: 'https://images.unsplash.com/photo-1504164996022-09080787b6b3?auto=format&fit=crop&w=800&q=60',
      machines: [...Array(10)].map((_, i) => i + 1),
    },
    k25: {
      label: 'K25',
      img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=60',
      machines: [...Array(10)].map((_, i) => i + 1),
    },
  },
  machineImg: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60',
};
