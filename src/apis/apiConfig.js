const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'ec2ecd7b1d5a1d6996ec92a5ba7edf87',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;