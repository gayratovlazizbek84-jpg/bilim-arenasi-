// React Native Component Primitives for Quiz Arena
// Provides idiomatic React Native components that cleanly integrate with HTML and Tailwind CSS

import React, { useState } from 'react';

export const View = ({ style = {}, className = '', children, onClick, ...props }) => {
  return (
    <div
      style={style}
      className={`box-border flex flex-col ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const Text = ({ style = {}, className = '', children, numberOfLines, ...props }) => {
  const lineClampClass = numberOfLines ? `line-clamp-${numberOfLines}` : '';
  return (
    <span
      style={style}
      className={`text-slate-100 ${lineClampClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export const TouchableOpacity = ({
  onPress,
  disabled = false,
  activeOpacity = 0.7,
  style = {},
  className = '',
  children,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onPress}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      style={{
        ...style,
        opacity: disabled ? 0.5 : isPressed ? activeOpacity : 1,
        transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      className={`outline-none focus:outline-none select-none text-left border-none bg-transparent p-0 m-0 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Pressable = TouchableOpacity;

export const ScrollView = ({
  horizontal = false,
  showsVerticalScrollIndicator = true,
  showsHorizontalScrollIndicator = true,
  style = {},
  className = '',
  contentContainerStyle = {},
  children,
  ...props
}) => {
  const overflowClass = horizontal ? 'overflow-x-auto overflow-y-hidden' : 'overflow-y-auto overflow-x-hidden';
  const flexDir = horizontal ? 'flex-row' : 'flex-col';

  return (
    <div
      style={style}
      className={`${overflowClass} custom-scrollbar ${className}`}
      {...props}
    >
      <div style={contentContainerStyle} className={`flex ${flexDir} min-w-full`}>
        {children}
      </div>
    </div>
  );
};

export const TextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  style = {},
  className = '',
  disabled = false,
  ...props
}) => {
  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChangeText && onChangeText(e.target.value)}
        placeholder={placeholder}
        rows={numberOfLines}
        disabled={disabled}
        style={style}
        className={`bg-slate-900/90 text-white placeholder-slate-400 border border-slate-700/80 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all ${className}`}
        {...props}
      />
    );
  }

  return (
    <input
      type={secureTextEntry ? 'password' : 'text'}
      value={value}
      onChange={(e) => onChangeText && onChangeText(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      style={style}
      className={`bg-slate-900/90 text-white placeholder-slate-400 border border-slate-700/80 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all ${className}`}
      {...props}
    />
  );
};

export const SafeAreaView = ({ style = {}, className = '', children, ...props }) => {
  return (
    <div
      style={style}
      className={`min-h-screen w-full flex flex-col bg-[#070913] text-slate-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const Modal = ({
  visible = false,
  transparent = true,
  animationType = 'fade',
  onRequestClose,
  children
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md animate-scale-up">
        {children}
      </div>
    </div>
  );
};

export const ActivityIndicator = ({ size = 'small', color = '#06b6d4', className = '' }) => {
  const pixelSize = size === 'large' ? 'w-10 h-10' : 'w-5 h-5';
  return (
    <div className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${pixelSize} ${className}`} style={{ borderColor: color, borderRightColor: 'transparent' }} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

