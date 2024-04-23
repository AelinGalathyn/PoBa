package com.example.pobatest.Termek;

import android.os.Parcel;
import android.os.Parcelable;

import androidx.annotation.NonNull;

import com.example.pobatest.R;
import com.example.pobatest.Rendeles.RendelesTermek;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class Termek implements Parcelable {
    public Integer id;
    public String sku;

    public String name;
    public Double qty;
    public String unit;
    public Integer status;
    public List<String> cat_name;
    public String url;
    public String pic_url;
    public Double price;
    public Boolean packaged;
    public Integer mennyiseg_img;

    public Termek(JSONObject object){

        try {
            id = object.getInt("id");
            sku = object.getString("sku");
            name = object.getString("name");
            qty = object.getDouble("qty");
            unit = object.getString("unit");
            status = object.getInt("status");

            catNameFeltolt(object);

            url = object.getString("url");
            pic_url = object.getString("pic_url");
            price = object.getDouble("price");
            packaged = object.getBoolean("packaged");

            mennyisegAlapjanIcon();

        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }

    protected Termek(Parcel in) {
        id = (in.readByte() == 0) ? null : in.readInt();
        sku = in.readString();
        name = in.readString();
        qty = (in.readByte() == 0) ? null : in.readDouble();
        unit = in.readString();
        status = (in.readByte() == 0) ? null : in.readInt();
        cat_name = in.createStringArrayList();
        url = in.readString();
        pic_url = in.readString();
        price = (in.readByte() == 0) ? null : in.readDouble();
        byte tmpPackaged = in.readByte();
        packaged = (tmpPackaged == 0) ? null : (tmpPackaged == 1);
        mennyiseg_img = (in.readByte() == 0) ? null : in.readInt();
    }

    public static final Creator<Termek> CREATOR = new Creator<Termek>() {
        @Override
        public Termek createFromParcel(Parcel in) {
            return new Termek(in);
        }

        @Override
        public Termek[] newArray(int size) {
            return new Termek[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(@NonNull Parcel dest, int flags) {
        dest.writeByte((id == null) ? (byte) 0 : (byte) 1); if (id != null) dest.writeInt(id);
        dest.writeString(sku);
        dest.writeString(name);
        dest.writeByte((qty == null) ? (byte) 0 : (byte) 1); if (qty != null) dest.writeDouble(qty);
        dest.writeString(unit);
        dest.writeByte((status == null) ? (byte) 0 : (byte) 1); if (status != null) dest.writeInt(status);
        dest.writeStringList(cat_name);
        dest.writeString(url);
        dest.writeString(pic_url);
        dest.writeByte((price == null) ? (byte) 0 : (byte) 1); if (price != null) dest.writeDouble(price);
        dest.writeByte((byte) (packaged == null ? 0 : packaged ? 1 : 2));
        dest.writeByte((mennyiseg_img == null) ? (byte) 0 : (byte) 1); if (mennyiseg_img != null) dest.writeInt(mennyiseg_img);
    }

    public void mennyisegAlapjanIcon() {
        mennyiseg_img = (qty > 0 && qty <= 10) ?
                R.drawable.kifogyoban_icon :
                (qty == 0) ? R.drawable.elfogyott_icon :
                0;

    }

    public void catNameFeltolt(JSONObject object) {
        cat_name = new ArrayList<>();
        try {
            JSONArray cat_namejson = object.getJSONArray("cat_name");
            for (int i = 0; i < cat_namejson.length(); i++) {
                String cat = cat_namejson.getString(i);
                cat_name.add(cat);
            }
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }
}
