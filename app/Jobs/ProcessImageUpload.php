<?php

namespace App\Jobs;

use App\DTO\PhotoDTO;
use App\Services\PhotosService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class ProcessImageUpload implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected PhotoDTO $photoDTO;
    protected string $imageName;
    protected  string $imageath;

    /**
     * @param PhotoDTO $photoDTO
     * @param string $imageName
     * @param string $imagePath
     */
    public function __construct(PhotoDTO $photoDTO, string $imageName, string $imagePath)
    {
        $this->photoDTO = $photoDTO;
        $this->imageName = $imageName;
        $this->imageath = $imagePath;
    }




    /**
     * Create a new job instance.
     */


    /**
     * Execute the job.
     */
    public function handle(PhotosService $photosService): void
    {
        Storage::disk('public')->put('storage/uploads/objets/images/' . $this->imageName, file_get_contents($this->imagePath));
        $this->photoDTO->lien = asset('storage/uploads/objets/images/'.$this->imageName);
        $this->photoService->store($photoPDO);
    }
}
