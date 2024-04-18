package com.example.pobatest.Rendeles;

import android.os.Parcel;
import android.os.Parcelable;

import com.example.pobatest.R;
import com.example.pobatest.Rendeles.RendelesTermek;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Rendeles implements Parcelable {
    public Integer orderid;
    public Date date;
    public String type;
    public Integer status_id;
    public Integer sender;
    public String payment;
    public Integer gross;
    public Double weight;
    public String c_name;
    public int image;
    public List<RendelesTermek> termekList;

    // Constructor used for parcel
    protected Rendeles(Parcel in) {
        if (in.readByte() == 0) {
            orderid = null;
        } else {
            orderid = in.readInt();
        }
        long tmpDate = in.readLong();
        date = tmpDate == -1 ? null : new Date(tmpDate);
        type = in.readString();
        status_id = in.readByte() == 0 ? null : in.readInt();
        sender = in.readByte() == 0 ? null : in.readInt();
        payment = in.readString();
        gross = in.readByte() == 0 ? null : in.readInt();
        weight = (Double) in.readSerializable();
        c_name = in.readString();
        termekList = new ArrayList<>();
        if(payment.toLowerCase().contains("gls")){
            image = R.drawable.gls_logo;
        }
        else if(payment.toLowerCase().contains("posta")||payment.toLowerCase().contains("mpl")){
            image = R.drawable.mpl;
        }
        else if(payment.toLowerCase().contains("foxpost")){
            image = R.drawable.foxpost_logo;
        }
        in.readList(termekList, RendelesTermek.class.getClassLoader());
    }


    public Rendeles(JSONObject object){
        SimpleDateFormat formatter = new SimpleDateFormat();
        try {
            orderid = object.getInt("orderid");
            date = formatter.parse(object.getString("date"));
            type = object.getString("type");
            status_id = object.getInt("status_id");
            sender = object.getInt("sender");
            payment = object.getString("payment");
            gross = object.getInt("gross");
            weight = object.getDouble("weight");
            c_name = object.getJSONObject("Customer").getString("c_name");
        } catch (JSONException e) {
            throw new RuntimeException(e);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        List<RendelesTermek> termekek = new ArrayList<>();
        JSONArray termekjson = null;
        try {
            termekjson = object.getJSONArray("items");
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        for (int i = 0; i < termekjson.length(); i++) {
            RendelesTermek termek = null;
            try {
                termek = new RendelesTermek(termekjson.getJSONObject(i));
            } catch (JSONException e) {
                throw new RuntimeException(e);
            }
            termekek.add(termek);
        }
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        if (orderid == null) {
            dest.writeByte((byte) 0);
        } else {
            dest.writeByte((byte) 1);
            dest.writeInt(orderid);
        }
        dest.writeLong(date != null ? date.getTime() : -1);
        dest.writeString(type);
        if (status_id == null) {
            dest.writeByte((byte) 0);
        } else {
            dest.writeByte((byte) 1);
            dest.writeInt(status_id);
        }
        if (sender == null) {
            dest.writeByte((byte) 0);
        } else {
            dest.writeByte((byte) 1);
            dest.writeInt(sender);
        }
        dest.writeString(payment);
        if (gross == null) {
            dest.writeByte((byte) 0);
        } else {
            dest.writeByte((byte) 1);
            dest.writeInt(gross);
        }
        dest.writeSerializable((Serializable) weight);
        dest.writeString(c_name);
        dest.writeList(termekList);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Rendeles> CREATOR = new Creator<Rendeles>() {
        @Override
        public Rendeles createFromParcel(Parcel in) {
            return new Rendeles(in);
        }

        @Override
        public Rendeles[] newArray(int size) {
            return new Rendeles[size];
        }
    };
}
