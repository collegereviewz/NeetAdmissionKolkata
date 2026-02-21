export const extractYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|live\/))([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};

export const getYoutubeThumbnail = (youtubeLink, fallbackImg) => {
    const videoId = extractYoutubeId(youtubeLink);
    if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return fallbackImg;
};

export const playlistData = {
    Faridabad: [
        { id: 'f1', title: 'NEET PG 2025', count: 7, year: '2025', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400' },
        { id: 'f2', title: 'AIQ Expected Cut off NEET PG 2024', count: 22, year: '2024', img: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400' },
        { id: 'f3', title: 'DNB Cutoff', count: 1, year: '2023', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400' },
        { id: 'f4', title: 'NEET PG 2024 Counselling', count: 150, year: '2024', img: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=400' },
        { id: 'f5', title: 'What you Can you Between Rank 1k to 1 Lakh', count: 11, year: '2023', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400' },
        { id: 'f6', title: 'AIQ All Branch Expected Cut off of Gen, EWS, OBC, SC, S...', count: 16, year: '2023', img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400' },
        { id: 'f7', title: 'MD MS DNB', count: 266, year: '2023', img: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400' },
        { id: 'f8', title: 'UG MBBS Counselling Process', count: 23, year: '2022', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400' },
    ],
    Kolkata: [
        { id: 'k1', title: 'NEET UG 2025 MBBS Counselling', count: 14, year: '2025', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400' },
        { id: 'k2', title: 'NEET UG 2024 MBBS Counselling', count: 5, year: '2024', img: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400' },
    ],
    UG: [
        { id: 'ug1', title: 'NEET UG 2025 MBBS Counselling', count: 15, year: '2025', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400' },
        { id: 'ug2', title: 'NEET UG 2024 MBBS Counselling', count: 45, year: '2024', img: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400' },
    ]
};

export const getAllPlaylists = () => {
    return [
        ...playlistData.Faridabad.map(p => ({ ...p, location: 'Faridabad' })),
        ...playlistData.Kolkata.map(p => ({ ...p, location: 'Kolkata' })),
        ...playlistData.UG.map(p => ({ ...p, location: 'UG' }))
    ];
};

export const getPlaylistThumbnail = (playlist) => {
    if (playlist.youtubeLink) return getYoutubeThumbnail(playlist.youtubeLink, playlist.img);
    const videos = videoData[playlist.id] || [];
    if (videos.length > 0 && (videos[0].youtubeLink)) {
        return getYoutubeThumbnail(videos[0].youtubeLink, playlist.img);
    }
    return playlist.img;
};

export const getAvailableYears = (location = null) => {
    const playlists = location ? playlistData[location] : getAllPlaylists();
    const years = ['All', '2026', ...new Set(playlists.map(p => p.year))];
    return [...new Set(years)].sort((a, b) => {
        if (a === 'All') return -1;
        if (b === 'All') return 1;
        return b - a;
    });
};

export const getLatestVideos = (limit = 10) => {
    const allVideos = [];
    const playlists = getAllPlaylists().sort((a, b) => b.year - a.year);

    playlists.forEach(playlist => {
        const videos = videoData[playlist.id] || [];
        videos.forEach((v, index) => {
            if (v.youtubeLink) {
                allVideos.push({
                    ...v,
                    playlistTitle: playlist.title,
                    playlistId: playlist.id,
                    year: playlist.year,
                    count: playlist.count,
                    originalIndex: playlist.count - index
                });
            }
        });
    });

    // Since we don't have real timestamps, we assume playlists are sorted by year DESC
    // and videos within playlists are also somewhat ordered.
    return allVideos.slice(0, limit);
};

export const videoData = {
    // Faridabad Playlists
    'f1': [
        { youtubeLink: 'https://youtu.be/1tk1I2DdYf0?si=yPt6tJYQJPToKpX7', title: 'NEET PG 2025 Counselling Started | MCC Round 1 Choice Filling | All India Counselling Latest Update' }, // 1
        { youtubeLink: '' }, // 2
        { youtubeLink: '' }, // 3
        { youtubeLink: '' }, // 4
        { youtubeLink: '' }, // 5
        { youtubeLink: '' }, // 6
        { youtubeLink: '' }  // 7
    ],
    'f2': [
        { youtubeLink: 'https://youtu.be/VoY_uTlTEKQ?si=jpA0MXj9DEIVtF18', title: 'NEET PG 2024 Expected Cut off of OBS & Gyane Branch 2024 Counselling' }, // 1
        { youtubeLink: '' }, // 2
        { youtubeLink: '' }, // 3
        { youtubeLink: '' }, // 4
        { youtubeLink: '' }, // 5
        { youtubeLink: '' }, // 6
        { youtubeLink: '' }, // 7
        { youtubeLink: '' }, // 8
        { youtubeLink: '' }, // 9
        { youtubeLink: '' }, // 10
        { youtubeLink: '' }, // 11
        { youtubeLink: '' }, // 12
        { youtubeLink: '' }, // 13
        { youtubeLink: '' }, // 14
        { youtubeLink: '' }, // 15
        { youtubeLink: '' }, // 16
        { youtubeLink: '' }, // 17
        { youtubeLink: '' }, // 18
        { youtubeLink: '' }, // 19
        { youtubeLink: '' }, // 20
        { youtubeLink: '' }, // 21
        { youtubeLink: '' }  // 22
    ],
    'f3': [
        { youtubeLink: 'https://youtu.be/wlp7WlscKdI?si=uaFY2CA_zuUyFjFB', title: 'Neet PG 2024:#DNB Radio- Diagnosis Cutoff 2023 Contact us : 9711449835' } // 1
    ],
    'f4': [
        { youtubeLink: 'https://youtu.be/X_pWw0KecH0?si=Byu3oJ6kkWwwdI1p', title: 'Neet PG 2024: Application Form Expected Release Date: Latest Updates and Predictions' }, // 1
        { youtubeLink: '' }, // 2
        { youtubeLink: '' }, // 3
        { youtubeLink: '' }, // 4
        { youtubeLink: '' }, // 5
        { youtubeLink: '' }, // 6
        { youtubeLink: '' }, // 7
        { youtubeLink: '' }, // 8
        { youtubeLink: '' }, // 9
        { youtubeLink: '' }, // 10
        { youtubeLink: '' }, // 11
        { youtubeLink: '' }, // 12
        { youtubeLink: '' }, // 13
        { youtubeLink: '' }, // 14
        { youtubeLink: '' }, // 15
        { youtubeLink: '' }, // 16
        { youtubeLink: '' }, // 17
        { youtubeLink: '' }, // 18
        { youtubeLink: '' }, // 19
        { youtubeLink: '' }, // 20
        { youtubeLink: '' }, // 21
        { youtubeLink: '' }, // 22
        { youtubeLink: '' }, // 23
        { youtubeLink: '' }, // 24
        { youtubeLink: '' }, // 25
        { youtubeLink: '' }, // 26
        { youtubeLink: '' }, // 27
        { youtubeLink: '' }, // 28
        { youtubeLink: '' }, // 29
        { youtubeLink: '' }, // 30
        { youtubeLink: '' }, // 31
        { youtubeLink: '' }, // 32
        { youtubeLink: '' }, // 33
        { youtubeLink: '' }, // 34
        { youtubeLink: '' }, // 35
        { youtubeLink: '' }, // 36
        { youtubeLink: '' }, // 37
        { youtubeLink: '' }, // 38
        { youtubeLink: '' }, // 39
        { youtubeLink: '' }, // 40
        { youtubeLink: '' }, // 41
        { youtubeLink: '' }, // 42
        { youtubeLink: '' }, // 43
        { youtubeLink: '' }, // 44
        { youtubeLink: '' }, // 45
        { youtubeLink: '' }, // 46
        { youtubeLink: '' }, // 47
        { youtubeLink: '' }, // 48
        { youtubeLink: '' }, // 49
        { youtubeLink: '' }, // 50
        { youtubeLink: '' }, // 51
        { youtubeLink: '' }, // 52
        { youtubeLink: '' }, // 53
        { youtubeLink: '' }, // 54
        { youtubeLink: '' }, // 55
        { youtubeLink: '' }, // 56
        { youtubeLink: '' }, // 57
        { youtubeLink: '' }, // 58
        { youtubeLink: '' }, // 59
        { youtubeLink: '' }, // 60
        { youtubeLink: '' }, // 61
        { youtubeLink: '' }, // 62
        { youtubeLink: '' }, // 63
        { youtubeLink: '' }, // 64
        { youtubeLink: '' }, // 65
        { youtubeLink: '' }, // 66
        { youtubeLink: '' }, // 67
        { youtubeLink: '' }, // 68
        { youtubeLink: '' }, // 69
        { youtubeLink: '' }, // 70
        { youtubeLink: '' }, // 71
        { youtubeLink: '' }, // 72
        { youtubeLink: '' }, // 73
        { youtubeLink: '' }, // 74
        { youtubeLink: '' }, // 75
        { youtubeLink: '' }, // 76
        { youtubeLink: '' }, // 77
        { youtubeLink: '' }, // 78
        { youtubeLink: '' }, // 79
        { youtubeLink: '' }, // 80
        { youtubeLink: '' }, // 81
        { youtubeLink: '' }, // 82
        { youtubeLink: '' }, // 83
        { youtubeLink: '' }, // 84
        { youtubeLink: '' }, // 85
        { youtubeLink: '' }, // 86
        { youtubeLink: '' }, // 87
        { youtubeLink: '' }, // 88
        { youtubeLink: '' }, // 89
        { youtubeLink: '' }, // 90
        { youtubeLink: '' }, // 91
        { youtubeLink: '' }, // 92
        { youtubeLink: '' }, // 93
        { youtubeLink: '' }, // 94
        { youtubeLink: '' }, // 95
        { youtubeLink: '' }, // 96
        { youtubeLink: '' }, // 97
        { youtubeLink: '' }, // 98
        { youtubeLink: '' }, // 99
        { youtubeLink: '' }, // 100
        { youtubeLink: '' }, // 101
        { youtubeLink: '' }, // 102
        { youtubeLink: '' }, // 103
        { youtubeLink: '' }, // 104
        { youtubeLink: '' }, // 105
        { youtubeLink: '' }, // 106
        { youtubeLink: '' }, // 107
        { youtubeLink: '' }, // 108
        { youtubeLink: '' }, // 109
        { youtubeLink: '' }, // 110
        { youtubeLink: '' }, // 111
        { youtubeLink: '' }, // 112
        { youtubeLink: '' }, // 113
        { youtubeLink: '' }, // 114
        { youtubeLink: '' }, // 115
        { youtubeLink: '' }, // 116
        { youtubeLink: '' }, // 117
        { youtubeLink: '' }, // 118
        { youtubeLink: '' }, // 119
        { youtubeLink: '' }, // 120
        { youtubeLink: '' }, // 121
        { youtubeLink: '' }, // 122
        { youtubeLink: '' }, // 123
        { youtubeLink: '' }, // 124
        { youtubeLink: '' }, // 125
        { youtubeLink: '' }, // 126
        { youtubeLink: '' }, // 127
        { youtubeLink: '' }, // 128
        { youtubeLink: '' }, // 129
        { youtubeLink: '' }, // 130
        { youtubeLink: '' }, // 131
        { youtubeLink: '' }, // 132
        { youtubeLink: '' }, // 133
        { youtubeLink: '' }, // 134
        { youtubeLink: '' }, // 135
        { youtubeLink: '' }, // 136
        { youtubeLink: '' }, // 137
        { youtubeLink: '' }, // 138
        { youtubeLink: '' }, // 139
        { youtubeLink: '' }, // 140
        { youtubeLink: '' }, // 141
        { youtubeLink: '' }, // 142
        { youtubeLink: '' }, // 143
        { youtubeLink: '' }, // 144
        { youtubeLink: '' }, // 145
        { youtubeLink: '' }, // 146
        { youtubeLink: '' }, // 147
        { youtubeLink: '' }, // 148
        { youtubeLink: '' }, // 149
        { youtubeLink: '' }  // 150
    ],
    'f5': [
        { youtubeLink: 'https://youtu.be/N5a5Xpy2Qu0?si=nmMFpC377mU0VJky', title: 'Neet PG 2023: Know What you Can Get Between Rank 1000 to 10000' }, // 1
        { youtubeLink: '' }, // 2
        { youtubeLink: '' }, // 3
        { youtubeLink: '' }, // 4
        { youtubeLink: '' }, // 5
        { youtubeLink: '' }, // 6
        { youtubeLink: '' }, // 7
        { youtubeLink: '' }, // 8
        { youtubeLink: '' }, // 9
        { youtubeLink: '' }, // 10
        { youtubeLink: '' }  // 11
    ],
    'f6': [
        { youtubeLink: 'https://youtu.be/Tzy3veEw9Rk?si=MebB4oy4yztWicZ1', title: 'Neet PG 2023: AIQ Radiodiagnosis Expected Cut off Gen | EWS | OBC | SC | ST' }, // 1
        { youtubeLink: '' }, // 2
        { youtubeLink: '' }, // 3
        { youtubeLink: '' }, // 4
        { youtubeLink: '' }, // 5
        { youtubeLink: '' }, // 6
        { youtubeLink: '' }, // 7
        { youtubeLink: '' }, // 8
        { youtubeLink: '' }, // 9
        { youtubeLink: '' }, // 10
        { youtubeLink: '' }, // 11
        { youtubeLink: '' }, // 12
        { youtubeLink: '' }, // 13
        { youtubeLink: '' }, // 14
        { youtubeLink: '' }, // 15
        { youtubeLink: '' }  // 16
    ],
    'f7': [
        { youtubeLink: 'https://youtu.be/iamw231TMz4?si=wDI-FKpfOxaMNnq_', title: 'Neet PG 2023: What Is the Difference Between 2022 and 2023 Counselling' }, // 1
        { youtubeLink: '' }, // 2
        { youtubeLink: '' }, // 3
        { youtubeLink: '' }, // 4
        { youtubeLink: '' }, // 5
        { youtubeLink: '' }, // 6
        { youtubeLink: '' }, // 7
        { youtubeLink: '' }, // 8
        { youtubeLink: '' }, // 9
        { youtubeLink: '' }, // 10
        { youtubeLink: '' }, // 11
        { youtubeLink: '' }, // 12
        { youtubeLink: '' }, // 13
        { youtubeLink: '' }, // 14
        { youtubeLink: '' }, // 15
        { youtubeLink: '' }, // 16
        { youtubeLink: '' }, // 17
        { youtubeLink: '' }, // 18
        { youtubeLink: '' }, // 19
        { youtubeLink: '' }, // 20
        { youtubeLink: '' }, // 21
        { youtubeLink: '' }, // 22
        { youtubeLink: '' }, // 23
        { youtubeLink: '' }, // 24
        { youtubeLink: '' }, // 25
        { youtubeLink: '' }, // 26
        { youtubeLink: '' }, // 27
        { youtubeLink: '' }, // 28
        { youtubeLink: '' }, // 29
        { youtubeLink: '' }, // 30
        { youtubeLink: '' }, // 31
        { youtubeLink: '' }, // 32
        { youtubeLink: '' }, // 33
        { youtubeLink: '' }, // 34
        { youtubeLink: '' }, // 35
        { youtubeLink: '' }, // 36
        { youtubeLink: '' }, // 37
        { youtubeLink: '' }, // 38
        { youtubeLink: '' }, // 39
        { youtubeLink: '' }, // 40
        { youtubeLink: '' }, // 41
        { youtubeLink: '' }, // 42
        { youtubeLink: '' }, // 43
        { youtubeLink: '' }, // 44
        { youtubeLink: '' }, // 45
        { youtubeLink: '' }, // 46
        { youtubeLink: '' }, // 47
        { youtubeLink: '' }, // 48
        { youtubeLink: '' }, // 49
        { youtubeLink: '' }, // 50
        { youtubeLink: '' }, // 51
        { youtubeLink: '' }, // 52
        { youtubeLink: '' }, // 53
        { youtubeLink: '' }, // 54
        { youtubeLink: '' }, // 55
        { youtubeLink: '' }, // 56
        { youtubeLink: '' }, // 57
        { youtubeLink: '' }, // 58
        { youtubeLink: '' }, // 59
        { youtubeLink: '' }, // 60
        { youtubeLink: '' }, // 61
        { youtubeLink: '' }, // 62
        { youtubeLink: '' }, // 63
        { youtubeLink: '' }, // 64
        { youtubeLink: '' }, // 65
        { youtubeLink: '' }, // 66
        { youtubeLink: '' }, // 67
        { youtubeLink: '' }, // 68
        { youtubeLink: '' }, // 69
        { youtubeLink: '' }, // 70
        { youtubeLink: '' }, // 71
        { youtubeLink: '' }, // 72
        { youtubeLink: '' }, // 73
        { youtubeLink: '' }, // 74
        { youtubeLink: '' }, // 75
        { youtubeLink: '' }, // 76
        { youtubeLink: '' }, // 77
        { youtubeLink: '' }, // 78
        { youtubeLink: '' }, // 79
        { youtubeLink: '' }, // 80
        { youtubeLink: '' }, // 81
        { youtubeLink: '' }, // 82
        { youtubeLink: '' }, // 83
        { youtubeLink: '' }, // 84
        { youtubeLink: '' }, // 85
        { youtubeLink: '' }, // 86
        { youtubeLink: '' }, // 87
        { youtubeLink: '' }, // 88
        { youtubeLink: '' }, // 89
        { youtubeLink: '' }, // 90
        { youtubeLink: '' }, // 91
        { youtubeLink: '' }, // 92
        { youtubeLink: '' }, // 93
        { youtubeLink: '' }, // 94
        { youtubeLink: '' }, // 95
        { youtubeLink: '' }, // 96
        { youtubeLink: '' }, // 97
        { youtubeLink: '' }, // 98
        { youtubeLink: '' }, // 99
        { youtubeLink: '' }, // 100
        { youtubeLink: '' }, // 101
        { youtubeLink: '' }, // 102
        { youtubeLink: '' }, // 103
        { youtubeLink: '' }, // 104
        { youtubeLink: '' }, // 105
        { youtubeLink: '' }, // 106
        { youtubeLink: '' }, // 107
        { youtubeLink: '' }, // 108
        { youtubeLink: '' }, // 109
        { youtubeLink: '' }, // 110
        { youtubeLink: '' }, // 111
        { youtubeLink: '' }, // 112
        { youtubeLink: '' }, // 113
        { youtubeLink: '' }, // 114
        { youtubeLink: '' }, // 115
        { youtubeLink: '' }, // 116
        { youtubeLink: '' }, // 117
        { youtubeLink: '' }, // 118
        { youtubeLink: '' }, // 119
        { youtubeLink: '' }, // 120
        { youtubeLink: '' }, // 121
        { youtubeLink: '' }, // 122
        { youtubeLink: '' }, // 123
        { youtubeLink: '' }, // 124
        { youtubeLink: '' }, // 125
        { youtubeLink: '' }, // 126
        { youtubeLink: '' }, // 127
        { youtubeLink: '' }, // 128
        { youtubeLink: '' }, // 129
        { youtubeLink: '' }, // 130
        { youtubeLink: '' }, // 131
        { youtubeLink: '' }, // 132
        { youtubeLink: '' }, // 133
        { youtubeLink: '' }, // 134
        { youtubeLink: '' }, // 135
        { youtubeLink: '' }, // 136
        { youtubeLink: '' }, // 137
        { youtubeLink: '' }, // 138
        { youtubeLink: '' }, // 139
        { youtubeLink: '' }, // 140
        { youtubeLink: '' }, // 141
        { youtubeLink: '' }, // 142
        { youtubeLink: '' }, // 143
        { youtubeLink: '' }, // 144
        { youtubeLink: '' }, // 145
        { youtubeLink: '' }, // 146
        { youtubeLink: '' }, // 147
        { youtubeLink: '' }, // 148
        { youtubeLink: '' }, // 149
        { youtubeLink: '' }, // 150
        { youtubeLink: '' }, // 151
        { youtubeLink: '' }, // 152
        { youtubeLink: '' }, // 153
        { youtubeLink: '' }, // 154
        { youtubeLink: '' }, // 155
        { youtubeLink: '' }, // 156
        { youtubeLink: '' }, // 157
        { youtubeLink: '' }, // 158
        { youtubeLink: '' }, // 159
        { youtubeLink: '' }, // 160
        { youtubeLink: '' }, // 161
        { youtubeLink: '' }, // 162
        { youtubeLink: '' }, // 163
        { youtubeLink: '' }, // 164
        { youtubeLink: '' }, // 165
        { youtubeLink: '' }, // 166
        { youtubeLink: '' }, // 167
        { youtubeLink: '' }, // 168
        { youtubeLink: '' }, // 169
        { youtubeLink: '' }, // 170
        { youtubeLink: '' }, // 171
        { youtubeLink: '' }, // 172
        { youtubeLink: '' }, // 173
        { youtubeLink: '' }, // 174
        { youtubeLink: '' }, // 175
        { youtubeLink: '' }, // 176
        { youtubeLink: '' }, // 177
        { youtubeLink: '' }, // 178
        { youtubeLink: '' }, // 179
        { youtubeLink: '' }, // 180
        { youtubeLink: '' }, // 181
        { youtubeLink: '' }, // 182
        { youtubeLink: '' }, // 183
        { youtubeLink: '' }, // 184
        { youtubeLink: '' }, // 185
        { youtubeLink: '' }, // 186
        { youtubeLink: '' }, // 187
        { youtubeLink: '' }, // 188
        { youtubeLink: '' }, // 189
        { youtubeLink: '' }, // 190
        { youtubeLink: '' }, // 191
        { youtubeLink: '' }, // 192
        { youtubeLink: '' }, // 193
        { youtubeLink: '' }, // 194
        { youtubeLink: '' }, // 195
        { youtubeLink: '' }, // 196
        { youtubeLink: '' }, // 197
        { youtubeLink: '' }, // 198
        { youtubeLink: '' }, // 199
        { youtubeLink: '' }, // 200
        { youtubeLink: '' }, // 201
        { youtubeLink: '' }, // 202
        { youtubeLink: '' }, // 203
        { youtubeLink: '' }, // 204
        { youtubeLink: '' }, // 205
        { youtubeLink: '' }, // 206
        { youtubeLink: '' }, // 207
        { youtubeLink: '' }, // 208
        { youtubeLink: '' }, // 209
        { youtubeLink: '' }, // 210
        { youtubeLink: '' }, // 211
        { youtubeLink: '' }, // 212
        { youtubeLink: '' }, // 213
        { youtubeLink: '' }, // 214
        { youtubeLink: '' }, // 215
        { youtubeLink: '' }, // 216
        { youtubeLink: '' }, // 217
        { youtubeLink: '' }, // 218
        { youtubeLink: '' }, // 219
        { youtubeLink: '' }, // 220
        { youtubeLink: '' }, // 221
        { youtubeLink: '' }, // 222
        { youtubeLink: '' }, // 223
        { youtubeLink: '' }, // 224
        { youtubeLink: '' }, // 225
        { youtubeLink: '' }, // 226
        { youtubeLink: '' }, // 227
        { youtubeLink: '' }, // 228
        { youtubeLink: '' }, // 229
        { youtubeLink: '' }, // 230
        { youtubeLink: '' }, // 231
        { youtubeLink: '' }, // 232
        { youtubeLink: '' }, // 233
        { youtubeLink: '' }, // 234
        { youtubeLink: '' }, // 235
        { youtubeLink: '' }, // 236
        { youtubeLink: '' }, // 237
        { youtubeLink: '' }, // 238
        { youtubeLink: '' }, // 239
        { youtubeLink: '' }, // 240
        { youtubeLink: '' }, // 241
        { youtubeLink: '' }, // 242
        { youtubeLink: '' }, // 243
        { youtubeLink: '' }, // 244
        { youtubeLink: '' }, // 245
        { youtubeLink: '' }, // 246
        { youtubeLink: '' }, // 247
        { youtubeLink: '' }, // 248
        { youtubeLink: '' }, // 249
        { youtubeLink: '' }, // 250
        { youtubeLink: '' }, // 251
        { youtubeLink: '' }, // 252
        { youtubeLink: '' }, // 253
        { youtubeLink: '' }, // 254
        { youtubeLink: '' }, // 255
        { youtubeLink: '' }, // 256
        { youtubeLink: '' }, // 257
        { youtubeLink: '' }, // 258
        { youtubeLink: '' }, // 259
        { youtubeLink: '' }, // 260
        { youtubeLink: '' }, // 261
        { youtubeLink: '' }, // 262
        { youtubeLink: '' }, // 263
        { youtubeLink: '' }, // 264
        { youtubeLink: '' }, // 265
        { youtubeLink: '' }, // 266
    ],
    'f8': [
        { youtubeLink: 'https://youtu.be/rYRb573Lid4?si=X7q9RQh4Onkg8UC4', title: 'Neet 2022: Low Fees Private MBBS College in India' }, // 1
        { youtubeLink: '' }, // 2
        { youtubeLink: '' }, // 3
        { youtubeLink: '' }, // 4
        { youtubeLink: '' }, // 5
        { youtubeLink: '' }, // 6
        { youtubeLink: '' }, // 7
        { youtubeLink: '' }, // 8
        { youtubeLink: '' }, // 9
        { youtubeLink: '' }, // 10
        { youtubeLink: '' }, // 11
        { youtubeLink: '' }, // 12
        { youtubeLink: '' }, // 13
        { youtubeLink: '' }, // 14
        { youtubeLink: '' }, // 15
        { youtubeLink: '' }, // 16
        { youtubeLink: '' }, // 17
        { youtubeLink: '' }, // 18
        { youtubeLink: '' }, // 19
        { youtubeLink: '' }, // 20
        { youtubeLink: '' }, // 21
        { youtubeLink: '' }, // 22
        { youtubeLink: '' }  // 23
    ],

    // Kolkata Playlists
    'k1': [
        { youtubeLink: 'https://youtu.be/Z-gBIk13j5k?si=G8_dTnrWK4EHi4Im', title: 'NEET PG 2025 Counselling Started All India MCC Round 1 Choice Update আপনার Choice Filling শুরু হয়ে' }, // 1
        { youtubeLink: 'https://youtu.be/Re41Y1MWgbE?si=mpAf5duawAElKK-4', title: 'UG MCC 2025 Registration শুরু 21st July! | Step-by-Step গাইড | NEET UG Counselling | একদম Miss করবে' }, // 2
        { youtubeLink: 'https://www.youtube.com/live/UBSOpyULrxM?si=74tTcowsNTvAO8Ko', title: 'MBBS Admission 2025 India and Abroad' }, // 3
        { youtubeLink: 'https://youtu.be/b-v2WkOl-JQ?si=YykJZqyOubpEg-eO', title: 'NEET UG 2025 Kerala Counselling Reopen 🔥 | শুরু আজ থেকেই | Last Date: 23 June | Kolkata Center Info' }, // 4
        { youtubeLink: 'https://www.youtube.com/live/cGVdkqaXbes?si=pLBy4hhwUC-omjVu', title: 'What You Can Get in NEET UG 2025 🤔 | Govt/Private College Prediction 🔍 | Category Wise Cutoff' }, // 5
        { youtubeLink: 'https://www.youtube.com/live/EPClLeLZuvY?si=E8fajNLgesChUQxq', title: 'NEET UG 2025 Result OUT 🔥 | Marks vs Rank Analysis for UR, EWS, OBC, SC, ST | MBBS BDS Cutoff LIVE' }, // 6
        { youtubeLink: 'https://youtu.be/MHsu6QsIPz8?si=vYy-bpzlByG3uk47', title: 'Low Budget Private Medical Colleges in India – ভারতে স্বল্প বাজেটের প্রাইভেট মেডিকেল কলেজ লিস্ট' }, // 7
        { youtubeLink: 'https://youtu.be/vzDrjAaj4LM?si=ko3nAGHW6UTJgak3', title: 'NEET UG 2025 উত্তরকী NTA প্রকাশ করেছে – Check Now!' }, // 8
        { youtubeLink: 'https://youtu.be/yFIsX6CviNk?si=Q4Os6_Bpe0iK7iyB', title: 'MBBS 2025: গভর্নメント না সেমি গভর্নメント কলেজ? জানুন পার্থক্য! 🏥 | #Shorts #mbbsadmission #mbbs' }, // 9
        { youtubeLink: 'https://youtu.be/5EE5hmGeBd4?si=uVVmTLcunATuwhUo', title: 'পশ্চিমবঙ্গ BDS সরকারি কলেজ কাট-অফ ২০২৪ | UR, EWS, OBC, SC, ST শ্রেণি অনুযায়ী NEET কাটঅফ বিশ্লেষণ' }, // 10
        { youtubeLink: 'https://youtu.be/5EE5hmGeBd4?si=uVVmTLcunATuwhUo', title: 'পশ্চিমবঙ্গ BDS সরকারি কলেজ কাট-অফ ২০২৪ | UR, EWS, OBC, SC, ST শ্রেণি অনুযায়ী NEET কাটঅফ বিশ্লেষণ' }, // 11
        { youtubeLink: 'https://youtu.be/q2KzYc8TsGA?si=BNLTAg8bMlig4bLP', title: 'West Bengal MBBS প্রাইভেট কলেজ Govt কোটা Cut Off | UR, EWS, OBC, SC, ST | MBBS অ্যাডমিশন গাইডেন্স' },  // 12
        { youtubeLink: 'https://youtu.be/Hu7EHant2og?si=S3uOWiHZQ-xeUL5F', title: 'West Bengal MBBS সরকারি কলেজ Cut Off 2025 | UR, EWS, OBC A/B, SC, ST | Admission Counselling সাহায্য' }, // 13
        { youtubeLink: 'https://youtu.be/eRb6qZM5zDI?si=fnB6yw0JbMCukUWt', title: 'NEET UG 2025 অ্যাডমিট কার্ড প্রকাশিত হয়েছে 🔥 Admit Card Download Now' }  // 14
    ],
    'k2': [
        { youtubeLink: 'https://youtu.be/cQhcJWAeVaM?si=70BsUwgere0wAIrc', title: 'ESIC Category Benefits & Medical College Admission Guide 2024 | Eligibility | Cut-off #neetug2024' }, // 1
        { youtubeLink: '' }, // 2
        { youtubeLink: '' }, // 3
        { youtubeLink: '' }, // 4
        { youtubeLink: '' }  // 5
    ],

    // UG Playlists
    'ug1': [
        { youtubeLink: '' }, // 1
        { youtubeLink: '' }, // 2
        { youtubeLink: '' }, // 3
        { youtubeLink: '' }, // 4
        { youtubeLink: '' }, // 5
        { youtubeLink: '' }, // 6
        { youtubeLink: '' }, // 7
        { youtubeLink: '' }, // 8
        { youtubeLink: '' }, // 9
        { youtubeLink: '' }, // 10
        { youtubeLink: '' }, // 11
        { youtubeLink: '' }, // 12
        { youtubeLink: '' }, // 13
        { youtubeLink: '' }, // 14
        { youtubeLink: '' }  // 15
    ],
    'ug2': [
        { youtubeLink: '' }, // 1
        { youtubeLink: '' }, // 2
        { youtubeLink: '' }, // 3
        { youtubeLink: '' }, // 4
        { youtubeLink: '' }, // 5
        { youtubeLink: '' }, // 6
        { youtubeLink: '' }, // 7
        { youtubeLink: '' }, // 8
        { youtubeLink: '' }, // 9
        { youtubeLink: '' }, // 10
        { youtubeLink: '' }, // 11
        { youtubeLink: '' }, // 12
        { youtubeLink: '' }, // 13
        { youtubeLink: '' }, // 14
        { youtubeLink: '' }, // 15
        { youtubeLink: '' }, // 16
        { youtubeLink: '' }, // 17
        { youtubeLink: '' }, // 18
        { youtubeLink: '' }, // 19
        { youtubeLink: '' }, // 20
        { youtubeLink: '' }, // 21
        { youtubeLink: '' }, // 22
        { youtubeLink: '' }, // 23
        { youtubeLink: '' }, // 24
        { youtubeLink: '' }, // 25
        { youtubeLink: '' }, // 26
        { youtubeLink: '' }, // 27
        { youtubeLink: '' }, // 28
        { youtubeLink: '' }, // 29
        { youtubeLink: '' }, // 30
        { youtubeLink: '' }, // 31
        { youtubeLink: '' }, // 32
        { youtubeLink: '' }, // 33
        { youtubeLink: '' }, // 34
        { youtubeLink: '' }, // 35
        { youtubeLink: '' }, // 36
        { youtubeLink: '' }, // 37
        { youtubeLink: '' }, // 38
        { youtubeLink: '' }, // 39
        { youtubeLink: '' }, // 40
        { youtubeLink: '' }, // 41
        { youtubeLink: '' }, // 42
        { youtubeLink: '' }, // 43
        { youtubeLink: '' }, // 44
        { youtubeLink: '' }  // 45
    ],
};
