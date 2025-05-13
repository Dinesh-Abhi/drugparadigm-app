import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { PostModelTryout } from "@/redux/models/actionCreator";

const DynamicModelInference = ({ model: propModel }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  // Model from props or Redux state
  const model =
    propModel || useSelector((state) => state.GetSingleModelReducerRes.data);

  // Tryout response and loading state
  const { data: result, loading } = useSelector(
    (state) => state.PostModelTryoutReducerRes
  );

  // Initialize form state based on model.inputFields
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (model?.inputFields) {
      const initData = {};
      const buildInit = (fields, prefix = "") => {
        Object.entries(fields).forEach(([key, val]) => {
          if (typeof val === 'object') {
            buildInit(val, `${prefix}${key}.`);
          } else {
            initData[`${prefix}${key}`] = '';
          }
        });
      };
      buildInit(model.inputFields);
      setFormData(initData);
    }
  }, [model]);

  // Show toast on result change and clear on close
  useEffect(() => {
    if (!result) return;
    const variant = result.Error ? 'destructive' : 'default';
    toast({
      title: result.Error ? 'Inference Failed' : 'Inference Succeeded',
      description: result.message || '',
      variant,
      onOpenChange: (open) => {
        if (!open) {
          // dispatch(ClearModelTryout());
        }
      }
    });
  }, [result, toast, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!model) return;
    const payload = new FormData();
    payload.append("model_code", model.model_code);
    Object.entries(formData).forEach(([key, val]) => {
      // convert nested keys like "c0.tar_path" back to nested structure if API expects
      payload.append(key, val);
    });
    dispatch(PostModelTryout(payload));
  };

  // Recursively render input fields
  const renderFields = (fields, prefix = "") => {
    return Object.entries(fields).flatMap(([key, val]) => {
      const name = `${prefix}${key}`;
      if (typeof val === 'object') {
        return renderFields(val, `${name}.`);
      }
      return (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {name} ({val})
          </label>
          <Input
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            placeholder={`Enter input `}
            required
          />
        </div>
      );
    });
  };

  // Render output fields dynamically
  const renderOutput = () => {
    if (!result || !model.outputFields) return null;
    const out = result.output || {};
    return (
      <div className="mt-6 p-4 rounded-lg border bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <h4 className="font-semibold mb-2">Results:</h4>
        {Object.entries(model.outputFields).map(([field, type]) => (
          <div key={field} className="mb-2">
            <strong>{field}:</strong> {out[field]?.toString() || '-'}
          </div>
        ))}
      </div>
    );
  };

  if (!model) return null;

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        {model.name} Tryout
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {model.inputType === 'json' && renderFields(model.inputFields)}
        <Button type="submit" disabled={loading}>
          {loading ? 'Running...' : 'Tryout'}
        </Button>
      </form>

      {renderOutput()}
    </div>
  );
};

export default DynamicModelInference;