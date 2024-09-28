<script lang="ts">
// import type { PageData, ActionData } from './$types';

// export let data: PageData;

// export let form: ActionData;
</script>

<section id="hadding"
    class="relative overflow-hidden bg-gradient-to-b from-blue-50 via-transparent to-transparent pb-12 pt-20 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
    <div class="relative z-10">
        <div class="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
            <svg class="h-[60rem] w-[100rem] flex-none stroke-blue-600 opacity-20" aria-hidden="true">
                <defs>
                    <pattern id="e9033f3e-f665-41a6-84ef-756f6778e6fe" width="200" height="200" x="50%" y="50%"
                        patternUnits="userSpaceOnUse" patternTransform="translate(-100 0)">
                        <path d="M.5 200V.5H200" fill="none"></path>
                    </pattern>
                </defs>
                <svg x="50%" y="50%" class="overflow-visible fill-blue-50">
                    <path d="M-300 0h201v201h-201Z M300 200h201v201h-201Z" stroke-width="0"></path>
                </svg>
                <rect width="100%" height="100%" stroke-width="0" fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)">
                </rect>
            </svg>
        </div>
    </div>
    <div class="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                POLING<span class="text-blue-600">KU</span>
            </h1>
            <h2 class="mt-6 text-lg leading-8 text-gray-600">
                website poling buatan orang indonesia
            </h2>
            <div class="mt-10 flex items-center justify-center gap-x-6">
                <a class="isomorphic-link isomorphic-link--internal inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href="/poling">Cari Poling
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</section>

<section id="about">
    <div class="sm:flex items-center max-w-screen-xl">
        <div class="sm:w-1/2 p-10">
            <div class="image object-center text-center">
                <img src="https://i.imgur.com/WbQnbas.png">
            </div>
        </div>
        <div class="sm:w-1/2 p-5">
            <div class="text">
                <span class="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
                <h2 class="my-4 font-bold text-3xl  sm:text-4xl ">Tentang <span class="text-indigo-600">POLINGKU</span>
                </h2>
                <p class="text-gray-700 text-sm">
                    POLINGKU adalah platform yang memudahkan pengumpulan dan analisis data polling. Kami menyediakan alat intuitif untuk membantu organisasi dan individu memahami opini publik dengan cepat dan efisien. Dengan berbagai format polling dan analisis mendalam, kami mendukung pengambilan keputusan berbasis data. Kami berkomitmen pada privasi pengguna dan transparansi, menjadikan setiap suara penting. Bergabunglah dengan POLINGKU untuk berkontribusi pada perubahan positif!
                </p>
            </div>
        </div>
    </div>
</section>

<section id="survey">
    <div class="justify-center space-y-12">
        <h2 class="text-2xl font-bold text-center">Poling Terbaru</h2>
        <!-- isi -->
        <div class="flex flex-col p-5 lg:px-48 lg:py-11">
            <div class="bg-gray-100 p-5 mb-10">
                <h1 class="font-bold text-2xl mb-2">nama survey atau poling</h1>
                <p class="my-3 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius eaque a ipsam aliquid omnis,
                    beatae possimus recusandae illum rem. Minima sequi voluptas repudiandae id? Quae, facere quam suscipit sed,
                    aperiam sapiente pariatur soluta </p>
                <button class="text-white font-semibold bg-blue-600 hover:bg-blue-800 p-2 my-1 rounded">Ikut Poling</button>
            </div>
            <div class="bg-gray-100 p-5 mb-10">
                <h1 class="font-bold text-2xl mb-2">nama survey atau poling</h1>
                <p class="my-3 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius eaque a ipsam aliquid omnis,
                    beatae possimus recusandae illum rem. Minima sequi voluptas repudiandae id? Quae, facere quam suscipit sed,
                    aperiam sapiente pariatur soluta </p>
                <button class="text-white font-semibold bg-blue-600 hover:bg-blue-800 p-2 my-1 rounded">Lakukan Poling</button>
            </div>
            <div class="bg-gray-100 p-5 mb-10">
                <h1 class="font-bold text-2xl mb-2">nama survey atau poling</h1>
                <p class="my-3 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius eaque a ipsam aliquid omnis,
                    beatae possimus recusandae illum rem. Minima sequi voluptas repudiandae id? Quae, facere quam suscipit sed,
                    aperiam sapiente pariatur soluta </p>
                <button class="text-white font-semibold bg-blue-600 hover:bg-blue-800 p-2 my-1 rounded">Lakukan Poling</button>
            </div>
        </div>
    </div>
</section>

<section id="saran">
    <div class="bg-gray-100">
        <div class="container mx-auto py-12">
            <div class="max-w-lg mx-auto px-4">
                <h2 class="text-3xl font-semibold text-gray-900 mb-4">
                    SARAN
                </h2>
                <p class="text-gray-700 mb-8">
                    Berikan kami saran untuk membuta website ini lebih baik
                </p>
               <form action="" method="post" class="bg-white rounded-lg px-6 py-8 shadow-md">
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="name">Name</label>
                        <input
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name" type="text" placeholder="Enter your name">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="message">Message</label>
                        <textarea
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="message" rows="6" placeholder="Enter your message"></textarea>
                    </div>
                    <div class="flex justify-end">
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                            Send
                        </button>
                    </div>
        
                </form>
            </div>
        </div>
    </div>
</section>

<style scoped>
    /* section p {
        --at-apply: text-2xl text-[#888] font-semibold;
    } */
</style>
