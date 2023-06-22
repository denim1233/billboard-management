<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cookie;


class Contract extends Model
{
    use HasFactory;
    protected $table = 'cms_contract';
    protected $fillable = [
                            'slot_id','status_id','type_id','size',
                            'brand_id','start_date','end_date','installation_date',
                            'contract_type','approval_status','is_new','is_printed',
                            'contract_price','mode_of_payment','contract_number','parent_number',
                            'parent_contract_id','lesse','rental_id','remarks','printed_by','return_remarks',
                            'no_of_months','terms_of_contract'
                            ];

    protected static function boot() {
        parent::boot();

        static::creating(function ($model) {
            
            $model->created_by = Cookie::get('user_id');
            $model->updated_by = NULL;
        });

        static::updating(function ($model) {
            $model->updated_by = Cookie::get('user_id');
        });
    }

    protected $casts = [
        'created_at' => 'datetime:Y-m-d\ H:i:s a',
        'updated_at' => 'datetime:Y-m-d\ H:i:s a',
        'deleted_at' => 'datetime:Y-m-d\ H:i:s a',
    ];
}
