GDPC                                                                                  res://boid.gd.remap 0             #�b���� �X�&4Ņ�   res://boid.gdc  �      �      �U"�OVp��ږ܋�>   res://boid.tscn `
      4      ���P��KCD��_   res://main.gd.remap P             ֤�\n�������Dݮ�   res://main.gdc  �            ���Ǵj������   res://main.tscn �      i      ��(����Xf�6�   res://project.binaryp      �      �����Ɂ°�JʼGDSC   %   
   C   �     ���ӄ�   �������϶���   �����϶�   ����Ķ��   ��������Ӷ��   ����¶��   �������Ŷ���   ����׶��   ���������ض�   ��������¶��   ���������Ҷ�   �����޶�   �������ض���   �������ض���   ����Ӷ��   �������ض���   ������Ӷ   ��������   ����Ŷ��   �������������ض�   ��������������������Ŷ��   ���Ӷ���   ���׶���   ���Ҷ���   ���������¶�   ��������������ض   �����Ӷ�   ���������������ض���   ���ж���   ���������Ҷ�   ����������Ӷ   ����������������¶��   ���Ӷ���   ζ��   ϶��   ��Ӷ   ���������Ӷ�          d      
                 �������?   ,    )\���(�?   �                                                     '      (   	   /   
   7      ?      @      H      I      S      W      X      ^      f      g      m      t      ~      �      �      �      �      �      �      �      �       �   !   �   "   �   #   �   $   �   %   �   &   �   '   �   (   �   )   �   *   �   +   �   ,     -     .     /   %  0   -  1   0  2   1  3   7  4   @  5   G  6   L  7   T  8   ]  9   e  :   n  ;   z  <   �  =   �  >   �  ?   �  @   �  A   �  B   �  C   3YY;�  �  PR�  QYY0�  PQV�  W�  T�  �(  P�  R�  Q�  W�  T�  PQYY0�  P�  QV�  �  �  PQ�  �  �  �	  PQ�  �  �  �  �
  PQ�  �  �  &�  T�  PQ	�  V�  �  �  �  �  �  �  �  �  �  �  T�  PQ�  Y0�  PQV�  ;�  �  T�  �  ;�  W�  T�  PQ�  &�  T�  PQV�  .�  �  )�  �  V�  ;�  �  T�  PQ�  �  �  T�  �  �  �  T�  PQ�  .P�  �  Q�  Y0�	  PQV�  ;�  �  T�  �  ;�  W�  T�  PQ�  &�  T�  PQV�  .�  �  )�  �  V�  ;�  �  T�  PQ�  �  �  T�  �  �  �  T�  PQ�  .P�  �  QYY0�  PQV�  ;�  �  T�  �  )�  W�  T�  PQV�  ;�  �  T�  PQ�  ;�  P�  T�  �  Q�  �  �  T�  PQ�  .�  YY0�
  PQV�  ;�  �  PQT�  �  ;�  �  T�  �  ;�   �  �  &�  T�!  	�   V�  �  �  P�	  RQ�  &�  T�"  	�   V�  �  �  PR�	  Q�  &�  T�!  �  T�!  �   V�  �  �  P�	  RQ�  &�  T�"  �  T�"  �   V�  �  �  PR�	  Q�  .�  YY0�#  PQV�  �$  PQY`              [gd_scene load_steps=5 format=2]

[ext_resource path="res://boid.gd" type="Script" id=1]

[sub_resource type="CircleShape2D" id=1]
radius = 28.5878

[sub_resource type="CircleShape2D" id=3]
radius = 97.8695

[sub_resource type="CircleShape2D" id=2]
radius = 108.848

[node name="Boid" type="Node2D" groups=[
"boids",
]]
script = ExtResource( 1 )

[node name="Shape" type="Polygon2D" parent="."]
rotation = 1.5708
scale = Vector2( 0.5, 0.5 )
color = Color( 0.345098, 0.360784, 0.705882, 1 )
polygon = PoolVector2Array( -0.245453, -66.6254, 33.7319, 55.693, -0.245453, 29.1907, -31.5046, 56.3726 )

[node name="SeparationVision" type="Area2D" parent="."]
visible = false
collision_layer = 2
collision_mask = 2

[node name="CollisionShape2D" type="CollisionShape2D" parent="SeparationVision"]
shape = SubResource( 1 )

[node name="AlignmentVision" type="Area2D" parent="."]
visible = false
collision_layer = 4
collision_mask = 4

[node name="CollisionShape2D" type="CollisionShape2D" parent="AlignmentVision"]
shape = SubResource( 3 )

[node name="CohesionVision" type="Area2D" parent="."]
visible = false

[node name="CollisionShape2D" type="CollisionShape2D" parent="CohesionVision"]
shape = SubResource( 2 )

[node name="Timer" type="Timer" parent="."]
wait_time = 5.0
[connection signal="timeout" from="Timer" to="." method="die"]
            GDSC      	      �      ���ӄ�   �������Ŷ���   ����Ķ��   �����϶�   �����¶�   ����¶��   ��������������Ӷ   ���������Ҷ�   �������Ŷ���   ����׶��   ۶��   ������������������������ض��   ����¶��   ����������������Ҷ��   ��Ҷ   �������Ӷ���   ����޶��   �������ض���   �������϶���   ���������Ҷ�   ��������Ӷ��   ��������Ҷ��  �������?  �������?            spawn         res://boid.tscn    2      �      ,        Shape                                                       	   #   
   /      I      J      Q      X      a      m      r      �      �      �      �      �      3YY;�  Y;�  �  PRR�  QYY0�  PQV�  -�  Y0�  P�  QV�  &�  4�  �  T�  PQV�  �  �  P�(  PR�  QR�(  PR�  QR�(  PR�  QQ�  Y0�  P�	  QV�  ;�
  �  PQ�  &�  T�  P�  QV�  ;�  ?P�  QT�  PQ�  ;�  �  �  �  T�  �
  �  P�(  P�  R�  QR�(  P�  R�  QQ�  �  T�  �(  P�  R�  QP�
  �  QT�  PQ�  �  T�  P�  QT�  �  �  �  P�  Q�  �  �
  Y`      [gd_scene load_steps=2 format=2]

[ext_resource path="res://main.gd" type="Script" id=2]

[node name="Main" type="Node2D"]
script = ExtResource( 2 )

[node name="Background" type="ColorRect" parent="."]
margin_right = 1920.0
margin_bottom = 1081.0
color = Color( 0.137255, 0.137255, 0.137255, 1 )
__meta__ = {
"_edit_lock_": true,
"_edit_use_anchors_": false
}
       [remap]

path="res://boid.gdc"
 [remap]

path="res://main.gdc"
 ECFG      _global_script_classes             _global_script_class_icons             application/config/name         Boids      application/run/main_scene         res://main.tscn    display/window/size/width      �     display/window/size/height      8     display/window/stretch/mode         2d     display/window/stretch/aspect         keep
   input/left�              deadzone      ?      events              InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode        unicode           echo          script            InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode   A      unicode           echo          script         input/right�              deadzone      ?      events              InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode        unicode           echo          script            InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode   D      unicode           echo          script         input/up�              deadzone      ?      events              InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode        unicode           echo          script            InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode   W      unicode           echo          script      
   input/down�              deadzone      ?      events              InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode        unicode           echo          script            InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode   S      unicode           echo          script         input/spawn�              deadzone      ?      events              InputEventMouseButton         resource_local_to_scene           resource_name             device     ����   alt           shift             control           meta          command           button_mask           position              global_position               factor       �?   button_index         pressed           doubleclick           script                    