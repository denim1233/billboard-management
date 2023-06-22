<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;
    protected $table = 'cms_branch';
    protected $fillable = ['branch_name','status_id'];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d\ H:i:s a',
        'updated_at' => 'datetime:Y-m-d\ H:i:s a',
        'deleted_at' => 'datetime:Y-m-d\ H:i:s a',
    ];

}