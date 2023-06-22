<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;
    protected $table = 'cms_brand';
    protected $fillable = ['brand_name','status_id'];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d\ H:i:s a',
        'updated_at' => 'datetime:Y-m-d\ H:i:s a',
        'deleted_at' => 'datetime:Y-m-d\ H:i:s a',
    ];

}
